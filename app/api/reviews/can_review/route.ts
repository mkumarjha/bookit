import dbConnect from "@/backend/config/dbConnect";
import { canReview } from "@/backend/controllers/roomControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).get(canReview);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}