"use client"
import React from "react";
import RoomItem from "./room/RoomItem";
import { IRoom } from "@/backend/models/room";
import CustomPagination from "./layout/CustomPagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
    data: {
        success: boolean;
        resPerPage: number;
        filteredRoomCount: number;
        rooms: IRoom[];
    }
}
const Home = ({ data }: Props) => {
    const searchParams = useSearchParams();
    const location = searchParams.get('location');
    
    const {rooms, resPerPage, filteredRoomCount } = data ;
    return (
        <div>
            <section id="rooms" className="container mt-5">
                <h2 className="mb-3 ml-2 stays-heading">
                    {location ? `${filteredRoomCount} rooms found in ${location}`: `All Rooms`}
                </h2>
                <Link href="/search" className="ml-2 back-to-search me-1">
                <i className="fa fa-arrow-left"></i> Back to Search
                </Link>
                <div className="row mt-4">
                    { rooms?.length === 0 ? (
                            <div className="alert alert-danger mt-5 w-100">
                                <b>No Rooms</b>
                            </div>
                        ) : (
                        rooms?.map((room) => <RoomItem key={room.id} room={room}/>)
                        )
                    }
                </div>
            </section>
            <CustomPagination resPerPage={resPerPage} filteredRoomsCount={filteredRoomCount} />
        </div>
    );
}

export default Home;