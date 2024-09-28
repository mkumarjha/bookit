import Error from "@/app/error";
import AllBookings from "@/components/admin/AllBookings";
import { getAuthHeader } from "@/helpers/authHeader";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'All Bookings - ADMIN'
}


const getBookings = async () => {
    const authHeaders = getAuthHeader();
    
    const rooms = await fetch(`${ process.env.API_URL }api/admin/bookings`,authHeaders);
    return rooms.json();
}

export default async function AdminBookingsPage() {
    const data = await getBookings();
    if(data?.errMessage) {
        return <Error error={data} />
    }
    return <AllBookings data={data} />
}
