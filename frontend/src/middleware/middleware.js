import {NextResponse} from "next/response";

export default function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

  if(!token && !isAuthPage){
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (token && isAuthPage){
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
};

export const config = {
    matcher: ["/dashboard"]
}
