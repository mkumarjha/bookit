import Room from "../backend/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedRoom = async () => {
    try {
        await mongoose.connect("mongodb+srv://mithilesh999:NOWusxN90rtc4pHlll@cluster0.jmtl6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        await Room.deleteMany();
        console.log("Rooms are deleted");
        await Room.insertMany(rooms);
        console.log("Rooms are added");
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit();
    }
}

seedRoom();