import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Booking, { IBooking } from "../models/booking";
import Moment from "moment";
import { extendMoment } from "moment-range";
import ErrorHandler from "../utils/errorHandler";

const moment = extendMoment(Moment);

// Creating new Booking => /api/bookings
export const newBooking = catchAsyncErrors(async(req: NextRequest) => {
    const body = await req.json();
    const {
        room, 
        checkInDate, 
        checkOutDate, 
        daysOfStay, 
        amountPaid, 
        paymentInfo
    } = body;

    const booking = await Booking.create({
        room, 
        user: req.user._id,
        checkInDate, 
        checkOutDate, 
        daysOfStay, 
        amountPaid, 
        paymentInfo,
        paidAt: Date.now()
    })

    return NextResponse.json({
        booking
    })
})

// checking Boom Booking Availability => /api/bookings/check
export const checkRoomBookingAvailability = catchAsyncErrors(async(req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get('roomId');

    const checkInDate: Date = new Date(searchParams.get('checkInDate') as string)
    const checkOutDate: Date = new Date(searchParams.get('checkOutDate') as string)

    const bookings: IBooking[] = await Booking.find({
        room: roomId,
        $and: [
            { checkInDate: { $lte: checkOutDate } },
            { checkOutDate: { $gte: checkInDate } }
        ]
    });

    const isAvailable: boolean = bookings.length === 0  

    return NextResponse.json({
        isAvailable
    })
})

// Get room booked dates => /api/bookings/get_booked_dates
export const getRoomBookedDates = catchAsyncErrors(async(req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get('roomId');
    
    const bookings = await Booking.find({ room: roomId });

    const bookedDates = bookings.flatMap((booking) => Array.from(moment.range(moment(booking.checkInDate), moment(booking.checkOutDate)).by('day')))


    return NextResponse.json({
        bookedDates,
    })
})

// Get room booked dates => /api/bookings/my_bookings
export const myBookings = catchAsyncErrors(async(req: NextRequest) => {

    const bookings = await Booking.find({ user: req.user._id });

    return NextResponse.json({
        bookings,
    })
})

const getLastSixMonthSales = async () => {
    const last6MonthsSales : any = []

    // Get Current date
    const currentDate = moment();

    async function fetchSalesForMonth(startDate: moment.Moment, endDate: moment.Moment) {
        const result = await Booking.aggregate([
            // Stage 1 => filter the data
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },

            // Stage 2 => Grouping the data
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$amountPaid"},
                    numberOfBookings: {$sum: 1}
                }
            }

        ]);

        const { totalSales, numOfBookings } = result?.length > 0 ? result[0] : {totalSales: 0, numOfBookings: 0 };


        last6MonthsSales.push({
            monthName: startDate.format("MMMM"),
            totalSales, 
            numOfBookings})
    }

    for (let i = 0; i < 6; i++) {
        const startDate = moment(currentDate).startOf('month'); 
        const endDate = moment(currentDate).endOf('month'); 

        await fetchSalesForMonth(startDate, endDate);
        currentDate.subtract(1, "months");
    }


}

// Get sales stats => /api/admin/sales_stats
export const getSalesStats = catchAsyncErrors(async(req: NextRequest) => {

    const { searchParams } = new URL(req.url);

    const startDate = new Date(searchParams.get('startDate') as string);
    const endDate = new Date(searchParams.get('endDate') as string);

    startDate.setHours(0,0,0,0)
    endDate.setHours(23,59,59,999)

    const bookings = await Booking.find({
        createdAt: { $gte: startDate, $lte: endDate }
    })

    const numberOfBookings = bookings.length;

    const totalSales = bookings.reduce(
        (acc, booking) => acc + booking.amountPaid ,0 
    );

    return NextResponse.json({
        numberOfBookings,
        totalSales,
    })
})