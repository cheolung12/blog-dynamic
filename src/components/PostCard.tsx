import { Post } from '@/types';
import { cn } from '@/utils/style';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type PostCardProps = Post;

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  content,
  thumbnail,
  created_at,
}) => {
  return (
    <Link
      href={`/post/${id}`}
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
        <div className='flex items-center gap-4 mb-2'> 
          <h2 className='text-lg font-medium '>{title}</h2>
          <span>{created_at}</span>
        </div>
        <p className='line-clamp-3 text-sm w-[500px]'>{content}</p>
      </div>
    </Link>
  );
};

export default PostCard;
