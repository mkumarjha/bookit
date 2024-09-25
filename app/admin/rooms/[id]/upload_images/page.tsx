import Error from "@/app/error";
import AllRooms from "@/components/admin/AllRooms";
import UpdateRoom from "@/components/admin/UpdateRoom";
import UploadRoomImages from "@/components/admin/UploadRoomImages";
import Home from "@/components/Home";
import { getAuthHeader } from "@/helpers/authHeader";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Upload Room Images - ADMIN'
}


const getRooms = async (id: string) => {
    
    const rooms = await fetch(`${ process.env.API_URL }api/rooms/${id}`,{
        next: {
            tags: ["RoomDetails"]
        }
    });
    return rooms.json();
}

export default async function AdminUploadRoomImagesPage({params}: {params: { id: string}}) {
    const data = await getRooms(params?.id);
    if(data?.errMessage) {
        return <Error error={data} />
    }
    return <UploadRoomImages data={data} />
}
