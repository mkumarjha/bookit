import Home from "@/components/Home";
import Error from "./error";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'HomePage- BookIT'
}


const getRooms = async (searchParams : string) => {
    const urlParams = new URLSearchParams(searchParams);
    const queryString = urlParams.toString();
    const rooms = await fetch(`${ process.env.API_URL }api/rooms?${queryString}`,{
        cache: 'no-cache'
    });
    return rooms.json();
}

export default async function HomePage({ searchParams } : { searchParams: string}) {
    const data = await getRooms(searchParams);
    if(data?.errMessage) {
        return <Error error={data} />
    }
    return <Home data={data} />
}
