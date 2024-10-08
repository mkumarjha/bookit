import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user";

export interface IImage extends Document {
    public_id: string,
    url: string
}

export interface IReview extends Document {
    user: IUser,
    rating: number,
    comment: string
}

export interface ILocation {
    type: string,
    coordinates: number[],
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
}

export interface IRoom extends Document {
    name: String;
    description: string;
    pricePerNight: number;
    address: string;
    location: ILocation;
    guestCapacity: number;
    numOfBeds: number;
    numOfReviews: number;
    isInternet: boolean;
    isBreakfast: boolean;
    isAirConditioned: boolean;
    isPetsAllowed: boolean;
    isRoomCleaning: boolean;
    ratings: number;
    numOfReview: number;
    images: IImage;
    category: string;
    reviews: IReview[];
    user: IUser;
    createdAt: Date;
} 

const roomSchema: Schema<IRoom> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter room name'],
        trim: true,
        maxLength: [200, 'Room name can not exceed 100 character'], 
    },
    description: {
        type: String,
        required: [true, 'Please enter room description']
    },
    pricePerNight: {
        type: Number,
        required: [true, 'Please enter room price per night'],
        default: 0.0
    },
    address: {
        type: String,
        required: [true, "Please enter room address"]
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        cordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    guestCapacity: {
        type: Number,
        required: [true, 'Please enter room guest capacity'],
    },
    numOfBeds: {
        type: Number,
        required: [true, 'Please enter number of beds in room'],
    },
    isInternet: {
        type: Boolean,
        default: false
    },
    isBreakfast: {
        type: Boolean,
        default: false
    },
    isAirConditioned: {
        type: Boolean,
        default: false
    },
    isPetsAllowed: {
        type: Boolean,
        default: false
    },
    isRoomCleaning: {
        type: Boolean,
        default: false      
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please enter room category'],
        enum: {
            values: ['King', 'Single', 'Twins'],
            message: "Please select correct category for room"
        }
    },

    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false
});

export default mongoose.models.Room ||
  mongoose.model<IRoom>("Room", roomSchema);