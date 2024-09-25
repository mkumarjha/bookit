import Error from "@/app/error";
import AllRooms from "@/components/admin/AllRooms";
import UpdateRoom from "@/components/admin/UpdateRoom";
import Home from "@/components/Home";
import { getAuthHeader } from "@/helpers/authHeader";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Update Room - ADMIN'
}


const getRooms = async (id: string) => {
    const authHeaders = getAuthHeader();
    
    const rooms = await fetch(`${ process.env.API_URL }api/rooms/${id}`,{
        headers: authHeaders.headers
    });
    return rooms.json();
}

export default async function AdminUpdateRoomPage({params}: {params: { id: string}}) {
    const data = await getRooms(params?.id);
    if(data?.errMessage) {
        return <Error error={data} />
    }
    return <UpdateRoom data={data} />
}
