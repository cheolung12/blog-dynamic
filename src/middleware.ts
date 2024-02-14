import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.role !== 'authenticated')
    return NextResponse.redirect(new URL('/admin', request.url));
  return response;
}

export const config = {
    // 위 미들웨어 로직은 /write 페이지로 접속할때만 실행됨
    matcher: '/write',
}