import dbConnect from "@/backend/config/dbConnect";
import { getUserDetails, updateUser } from "@/backend/controllers/authControllers";
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

router.use(isAuthenticatedUser, authorizeRoles('admin')).get(getUserDetails);
router.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateUser);

export async function GET(request: NextRequest, ctx: RequestContext) : Promise<NextResponse> {
    return router.run(request, ctx) as Promise<NextResponse>;
}

export async function PUT(request: NextRequest, ctx: RequestContext) : Promise<NextResponse> {
    return router.run(request, ctx) as Promise<NextResponse>;
}