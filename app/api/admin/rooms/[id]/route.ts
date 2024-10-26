import dbConnect from "@/backend/config/dbConnect";
import { deleteRoom, updateRoom } from "@/backend/controllers/roomControllers";
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {
    params: {
        id: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateRoom);
router.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteRoom)

export async function PUT(request: NextRequest, ctx: RequestContext) : Promise<NextResponse> {
    return router.run(request, ctx)  as Promise<NextResponse>;
}

export async function DELETE(request: NextRequest, ctx: RequestContext) : Promise<NextResponse> {
    return router.run(request, ctx)  as Promise<NextResponse>;
}