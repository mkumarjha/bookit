import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import mongoose from "mongoose";
import ErrorHandler from "../utils/errorHandler";

// Get all rooms => /api/rooms
export const allRooms = catchAsyncErrors(async(req: NextRequest) => {
    const rooms = await Room.find();
    return NextResponse.json ({
        success: true,
        rooms
    })
})    

// Create new rooms => /api/rooms
export const newRoom = catchAsyncErrors (async (req: NextRequest) => {
    const body = await req.json();

    const room = await Room.create(body);

    return NextResponse.json({
        success: true,
        room
    });
});

// Get room details => /api/rooms/:id
export const getRoomDetails = catchAsyncErrors (async(req: NextRequest, { params } : {params: { id: string}}) => {
    
    const room = await Room.findById(params.id);
    
    if(!room){
        throw new ErrorHandler('Room not found', 404);
    }

    return NextResponse.json({
        success: true,
        room
    })
})

// Update room details => /api/rooms/:id
export const updateRoom = catchAsyncErrors (async(req: NextRequest, { params } : {params: { id: string}}) => {
    
    let room = await Room.findById(params.id);
    const body = await req.json();
    if(!room){
        throw new ErrorHandler('Room not found', 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, {
        new: true
    });

    return NextResponse.json({
        success: true,
        room
    })
})

// Delete room details => /api/rooms/:id
export const deleteRoom = catchAsyncErrors (async(req: NextRequest, { params } : {params: { id: string}}) => {
    
    let room = await Room.findById(params.id);
    
    if(!room){
        throw new ErrorHandler('Room not found', 404);
    }

    // TODO: Delete Image Associated
    await room.deleteOne();

    return NextResponse.json({
        success: true
    })
})