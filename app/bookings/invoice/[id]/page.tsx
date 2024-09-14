import Error from "@/app/error";
import Invoice from "@/components/invoice/Invoice";
import { getAuthHeader } from "@/helpers/authHeader";

//export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Bookings Invoice'
}


const getBooking = async (id: string) => {
    const authHeader = getAuthHeader();
    const res = await fetch(`${ process.env.API_URL }api/bookings/${id}`,authHeader);
    return res.json();
}

export default async function MyBookingsPage({params}: {params: {id: string}}) {
    const data = await getBooking(params?.id);
    console.log('mmmmmssss=>', data);
    
    if(data?.errMessage) {
         return <Error error={data} />
    }
    return <Invoice data={data} />
}
