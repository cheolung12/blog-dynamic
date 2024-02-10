import PostCard from '@/components/PostCard';
import { createClient } from '@/utils/supabase/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const supabase = createClient();

export default function Home() {
  const { ref, inView } = useInView();
  const {
    data: postPages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => {
      const { data } = await supabase
        .from('Post')
        .select('*')
        .order('created_at', { ascending: false })
        .range(pageParam, pageParam + 9); // 총 10개의 글들을 한 페이지로 가져오겠다.

      if (!data) return { posts: [], nextPage: null };
      return {
        posts: data,
        nextPage: data.length === 10 ? pageParam + 10 : null,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage]);

  return (
    <main className='flex flex-col'>
      <div className='container mx-auto grid grid-cols-2 gap-x-4 gap-y-6 lg:gap-x-7 lg:gap-y-12 px-4 pb-24 pt-20'>
        {postPages?.pages
          .flatMap((page) => page.posts)
          .map((post) => <PostCard key={post.id} {...post} />)}
      </div>
      <div ref={ref} />
    </main>
  );
}
