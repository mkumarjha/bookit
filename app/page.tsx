import Home from "@/components/layout/Home";
import Error from "./error";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'HomePage- BookIT'
}


const getRooms = async () => {
    const rooms = await fetch(`${ process.env.API_URL }api/rooms`,{
        cache: 'no-cache'
    });
    return rooms.json();
}

export default async function HomePage() {
    const data = await getRooms();
    if(data?.message) {
        return <Error error={data} />
    }
    return <Home data={data} />
}
