import Error from "@/app/error";
import BookingDetails from "@/components/bookings/BookingDetails";
import { getAuthHeader } from "@/helpers/authHeader";

//export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'My Bookings Details'
}


const getBooking = async (id: string) => {
    const authHeader = getAuthHeader();
    const res = await fetch(`${ process.env.API_URL }api/bookings/${id}`,authHeader);
    return res.json();
}

export default async function MyBookingsPage({params}: {params: {id: string}}) {
    const data = await getBooking(params?.id);
    if(data?.errMessage) {
         return <Error error={data} />
    }

    console.log("sssss", data);
    return <BookingDetails data={data} />
}
