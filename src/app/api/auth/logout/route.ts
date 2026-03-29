import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Đã đăng xuất' });
  
  // Xoá chứng chỉ xác thực bằng cách ghi đè và buộc Cookie hết hạn ngay lập tức
  response.cookies.set({
    name: 'iso_portal_auth',
    value: '',
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });
  
  return response;
}
