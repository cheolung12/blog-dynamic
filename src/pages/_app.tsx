import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import { cn } from '@/utils/style';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={cn('flex h-screen w-screen', inter.className)}>
        <div className='flex flex-col mx-auto w-[800px]'>
          <Header />
          <div className='flex flex-1 flex-col overflow-y-auto pt-10'>
            <main className='flex-1'>
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </div>
        
      </div>
    </QueryClientProvider>
  );
}
