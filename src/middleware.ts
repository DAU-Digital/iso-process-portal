import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Lấy cookie xác thực từ request
  const token = request.cookies.get('iso_portal_auth')?.value;
  
  // Nếu chưa đăng nhập và đang muốn vào trang chính -> Đá về trang đăng nhập
  if (!token && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Nếu ĐÃ đăng nhập mà cố vào lại trang đăng nhập -> Đá ra trang chủ
  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Các trường hợp hợp lệ thì cho đi qua bình thường
  return NextResponse.next();
}

// Chỉ chặn đúng trang chủ và trang login (bỏ qua các static file)
export const config = {
  matcher: ['/', '/login'],
};
