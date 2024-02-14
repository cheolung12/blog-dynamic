import { cn } from '@/utils/style';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

const Navbar: FC = () => {
  const router = useRouter();
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const currentPath = router.pathname.split('/').pop();
    if (currentPath === undefined) {
      setCurrent('');
    } else if (currentPath.startsWith('[')) {
      setCurrent(router.query[currentPath.slice(1, -1)] as string);
    } else {
      setCurrent(currentPath);
    }
  }, [router.pathname]);

  return (
    <nav className='flex justify-around text-2xl gap-4 font-bold'>
      <Link href='/posts' className={cn('hover:underline', current === 'posts' && 'underline')}>posts</Link>
      <Link href='/guestbook' className={cn('hover:underline', current === 'tags' && 'underline')}>guestbook</Link>
      <Link href='/search' className={cn('hover:underline', current === 'search' && 'underline')}>chatbot</Link>
    </nav>
  );
};

export default Navbar;
