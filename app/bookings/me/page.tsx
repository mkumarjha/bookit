import Error from "@/app/error";
import MyBookings from "@/components/bookings/MyBookings";
import Home from "@/components/Home";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'My Bookings'
}


const getBookings = async () => {
    const res = await fetch(`${ process.env.API_URL }api/bookings/me`,{
        cache: 'no-cache'
    });
    return res.json();
}

export default async function MyBookingsPage() {
    const data = await getBookings();
    console.log()
    if(data?.errMessage) {
         return <Error error={data} />
    }
    return <MyBookings data={data} />
}
