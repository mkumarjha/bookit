import Error from "@/app/error";
import RoomDetails from "@/components/room/RoomDetails";
import { title } from "process";

interface Props{
    params: {id: string}
}

const getRoom = async (id: string) => {
    const rooms = await fetch(`${ process.env.API_URL }api/rooms/${id}`, {
        next: {
            tags: ["RoomDetails"]
        }
    });
    return rooms.json();
}

export default async function RoomDetailsPage({ params }: Props ) {
    const data = await getRoom( params?.id);
    if(data?.errMessage) {
        return <Error error={data} />
    }
    return <RoomDetails data={data} />
}

export async function generateMetadata({ params }: Props) {
    const data = await getRoom(params?.id);
    return {
        title: data?.room?.name,
    }
}