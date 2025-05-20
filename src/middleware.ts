import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const url = req.nextUrl;

    // Check if the user is trying to access a protected route
    if (url.pathname.startsWith("/protected") && !token) {
        // Redirect to the login page if not authenticated
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}