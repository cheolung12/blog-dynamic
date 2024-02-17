import { Post } from '@/types';
import { cn } from '@/utils/style';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type PostCardProps = Post;

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  description,
  thumbnail,
  created_at,
}) => {
  return (
    <Link
      href={`/posts/${id}`}
      className={cn('flex hover:bg-slate-100 gap-4 p-4 rounded-sm')}
    >
      <div className='relative aspect-[1.8/1] w-[300px]'>
        <Image
          src={thumbnail ?? '/default_thumbnail.svg'}
          fill // 상위 요소 크기에 맞춰서 자동 지정
          alt={title}
          sizes='360px'
          className='object-cover'
          priority
        />
      </div>
      <div className='p-2 w-full'>
        <div className='flex items-center justify-between mb-2.5'>
          <h2 className='text-xl font-bold '>{title}</h2>
          <span className='text-sm text-slate-400'>
            {format(new Date(created_at), 'yyyy-MM-d')}
          </span>
        </div>
        <p className='line-clamp-3 text-sm w-[500px]'>{description}</p>
      </div>
    </Link>
  );
};

export default PostCard;
