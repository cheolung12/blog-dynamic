import Link from 'next/link';
import { FC } from 'react';
import Navbar from './Navbar';

const Header: FC = () => {
  return (
    <header className='flex h-16 pt-2 items-center justify-between px-4 lg:h-20 mb-10'>
      <Link href='/'>
        <h1 className='text-3xl font-bold lg:text-3xl '>cheolung.dev</h1>
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
