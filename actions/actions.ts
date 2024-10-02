'use server'

import User from "@/backend/models/user";
import { setTimeout } from "timers/promises";

function extractErrors(error: any) {
    if (error?.code === 11000) {
        return { error: `Duplicate ${Object.keys(error.keyValue)} entered` };
    }

    if (error?.response?.data?.message) {
        return error.response.data.message;
    }

    if (error?.message ) {
        return error.message;
    }

    return "Something went wrong";
}

export async function registerUser(formData: FormData) {
    try {
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
    
        const userData = {name, email, password};

        // const delay = new Promise((resolve: any) => setTimeout(resolve, 10000));
        // await delay;
    
        const data = await User.create(userData);
    
        if (data._id) return { isCreated: true };
        
    } catch (error: any) {
       return { error: extractErrors(error) };       
    }
}


export async function updateUserProfile(userId: string,formData: FormData) {
    try {
        const name = formData.get('name');
        const email = formData.get('email');
    
        const userData = {name, email};

        console.log(userId, userData);

        const data = await User.findByIdAndUpdate(userId, userData);
        console.log(data);
    
        if (data) return { isUpdated: true };
        
    } catch (error: any) {
       return { error: extractErrors(error) };       
    }
}