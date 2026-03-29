import { NextResponse } from 'next/server';

// Ở đây là "mật khẩu cứng" của bạn. Mặc định là dautckt2026. 
// Nếu bạn muốn thay đổi sau này, có thể ghi đè trong biến môi trường `.env` hoặc đổi trực tiếp ở đây.
const HARDCODED_PASSWORD = process.env.ADMIN_PASSWORD || 'dautckt2026';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // Kiểm tra mật khẩu
    if (password === HARDCODED_PASSWORD) {
      const response = NextResponse.json({ success: true, message: 'Xác thực hợp lệ' });
      
      // Tạo Cookies dạng HttpOnly: Trình duyệt tự lưu, Javascript trên Client không đọc được (Chống bị hack token)
      response.cookies.set({
        name: 'iso_portal_auth',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // Nhớ mật khẩu này 30 ngày
        path: '/',
      });
      return response;
    }
    
    // Nếu sai mật khẩu
    return NextResponse.json({ success: false, message: 'Mật khẩu truy cập không đúng' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 });
  }
}
