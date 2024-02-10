import { Post } from '@/types';
import { cn } from '@/utils/style';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type PostCardProps = Omit<Post, 'tags'> & { className?: string };

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  content,
  thumbnail,
  className,
}) => {
  return (
    <Link href={`/posts/${id}`} className={cn('bg-white', className)}>
      <div className='relative aspect-[1.8/1] w-full'>
        <Image
          src={thumbnail ?? '/default_thumbnail.svg'}
          fill // 상위 요소 크기에 맞춰서 자동 지정
          alt={title}
          sizes='360px'
          className='object-cover'
          priority
        />
      </div>
      <div className='p-2'>
        <h2 className='text-lg font-medium'>{title}</h2>
        <p className='line-clamp-3 text-sm text-gray-500'>{content}</p>
      </div>
    </Link>
  );
};

export default PostCard;
