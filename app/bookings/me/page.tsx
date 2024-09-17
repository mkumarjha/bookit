import Error from "@/app/error";
import MyBookings from "@/components/bookings/MyBookings";
import { getAuthHeader } from "@/helpers/authHeader";

//export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'My Bookings'
}


const getBookings = async () => {
    const authHeader = getAuthHeader();
    const res = await fetch(`${ process.env.API_URL }api/bookings/my_bookings`,authHeader);
    return res.json();
}

export default async function MyBookingsPage() {
    const data = await getBookings();
    if(data?.errMessage) {
         return <Error error={data} />
    }
    return <MyBookings data={data} />
}
