import { NextResponse } from "next/server";

const publicRoutes = ["/", "/contact"];

export  const middleware = (req)=> {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/auth");
  const isPublicPg = publicRoutes.includes(pathname);

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && !isPublicPg && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
};

export const config = {
     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
