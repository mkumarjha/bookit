import Error from "@/app/error";
import AllRooms from "@/components/admin/AllRooms";
import Home from "@/components/Home";
import { getAuthHeader } from "@/helpers/authHeader";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'All Rooms - ADMIN'
}


const getRooms = async () => {
    const authHeaders = getAuthHeader();
    
    const rooms = await fetch(`${ process.env.API_URL }api/admin/rooms`,{
        headers: authHeaders.headers
    });
    return rooms.json();
}

export default async function AdminRoomsPage() {
    const data = await getRooms();
    if(data?.errMessage) {
        return <Error error={data} />
    }
    return <AllRooms data={data} />
}
