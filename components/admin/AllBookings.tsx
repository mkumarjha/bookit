"use client";

import { IBooking } from "@/backend/models/booking";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import Link from "next/link";
import React from "react";

interface Props {
  data: {
    bookings: IBooking[];
  };
}

const AllBookings = ({ data }: Props) => {
    const bookings = data?.bookings;
    const setBookings = () => {
        const data: { columns: any[]; rows: any[] } = {
            columns: [
                {
                label: "ID",
                field: "id",
                sort: "asc",
                },
                {
                label: "Check In",
                field: "checkin",
                sort: "asc",
                },
                {
                label: "Check Out",
                field: "checkout",
                sort: "asc",
                },
                {
                label: "Actions",
                field: "actions",
                sort: "asc",
                },
            ],
            rows: []
        };

        bookings?.forEach((booking) => {
            data?.rows?.push({
                id: booking._id,
                //checkin: new Date(booking?.checkInDate).toLocaleString("en-US"),
                //checkout: new Date(booking?.checkOutDate).toLocaleString("en-US"),
                checkin: moment(booking?.checkInDate).format('DD-MM-YYYY'),
                checkout: moment(booking?.checkOutDate).format('DD-MM-YYYY'), 

                actions: (
                    <>
                        <Link href={`/bookings/${booking._id}`} className="btn btn-primary">
                        {" "}
                        <i className="fa fa-eye"></i>{" "}
                        </Link>
                        <Link
                        href={`/bookings/invoice/${booking._id}`}
                        className="btn btn-success ms-2"
                        >
                        {" "}
                        <i className="fa fa-receipt"></i>{" "}
                        </Link>
                        <button className="btn btn-outline-danger mx-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
                    ),
            });
        });
        return data;
    };

    return (
        <div className="container">
        <h1 className="my-5">{bookings?.length} Bookings</h1>
        <MDBDataTable
            data={setBookings()}
            className="px-3"
            bordered
            striped
            hover
        />
        </div>
    );
};

export default AllBookings;