import Error from "@/app/error";
import UpdateUser from "@/components/admin/UpdateUser";
import { getAuthHeader } from "@/helpers/authHeader";
import { title } from "process";

interface Props{
    params: {id: string}
}

export const metadata = {
    title: 'Update User - ADMIN'
}

const getUsers = async (id: string) => {
    const authHeader = getAuthHeader();
    const res = await fetch(`${ process.env.API_URL }api/admin/users/${id}`,authHeader);
    console.log(res);
    return res.json();
}

export default async function updateUserPage({ params }: Props) {
    
    const data = await getUsers(params?.id);
    
    if(data?.errMessage) {
        return <Error error={data} />
    }

    return <UpdateUser data={data} />
}