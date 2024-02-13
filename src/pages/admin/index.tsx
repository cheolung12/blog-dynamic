import Button from '@/components/Button';
import Input from '@/components/Input';
import { createClient } from '@/utils/supabase/client';
import { UserResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const supabase = createClient();

export default function Admin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [userResponse, setUserResponse] = useState<UserResponse>();
  console.log(userResponse);
  useEffect(() => {
    (async () => {
      const user = await supabase.auth.getUser();
      setUserResponse(user);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value ?? '',
      password: pwRef.current?.value ?? '',
    });

    if (error) {
      return alert('아이디와 비밀번호가 일치하지 않습니다.');
    }
    router.refresh();
  };

  return (
    <div className='container flex flex-col pb-20 pt-12'>
      {!!userResponse?.data.user ? (
        <div className='flex flex-col gap-2'>
          <div className='mb-8'>
            <b>{userResponse.data.user.email}님으로 로그인 하셨습니다.</b>
          </div>
          <button
            onClick={async () => {
              supabase.auth.signOut();
              router.push('/');
            }}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-8'>
          <h1 className='text-2xl font-medium'>관리자 로그인</h1>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3'>
              <Input type='text' placeholder='Admin ID' ref={emailRef} />
              <Input type='text' placeholder='Admin PW' ref={pwRef} />
            </div>
            <Button type='submit' className='mt-4'>
              로그인
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
