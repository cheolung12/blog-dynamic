import { cn } from '@/utils/style';
import { createClient } from '@/utils/supabase/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PostCard from './PostCard';

const supabase = createClient();

type PostListProps = {
  category: string;
};

const PostList: FC<PostListProps> = ({ category }) => {
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam = 0 }) => {
    let request = supabase.from('Post').select('*');
    if (category !== 'All') request = request.eq('category', category);

    const { data, error } = await request
      .order('created_at', { ascending: false })
      .range(pageParam, pageParam + 5);

    if (error) throw new Error(error.message);
    return {
      posts: data || [],
      nextPage: data?.length === 6 ? pageParam + 6 : null,
    };
  };

  // 무한 스크롤
  const {
    data: postPages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', category],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, category]);

  return (
    <div className={cn('flex flex-col items-center gap-8 pt-10')}>
      <div className='container flex flex-col gap-y-6 lg:gap-y-12 pb-24'>
        {postPages?.pages
          .flatMap((page) => page.posts)
          .map((post) => <PostCard key={post.id} {...post} />)}
      </div>
      <div ref={ref} />
    </div>
  );
};

export default PostList;
