import { MarkdownViewer } from '@/components/Markdown';
import { Post } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export default function Post({
  title,
  category,
  content,
  created_at,
  thumbnail,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className='container flex flex-col pb-20 gap-8'>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <div className='flex flex-row items-center gap-2'>
        <Link
          href={`/categories/${category}`}
          className='rounded-md bg-slate-800 px-2 py-1 text-sm text-white'
        >
          {category}
        </Link>
        <div className='text-sm'>
          {format(new Date(created_at), 'yyyy년 M월 d일')}
        </div>
      </div>
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title}
          width={0}
          height={0}
          sizes='100vw'
          className='h-auto w-full mb-4'
        />
      )}
      <MarkdownViewer source={content} className='min-w-full' />
    </div>
  );
}

const supabase = createClient({});

export const getStaticPaths = (async () => {
  const { data } = await supabase.from('Post').select('id');

  return {
    paths: data?.map(({ id }) => ({ params: { id: id.toString() } })) ?? [],
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { data } = await supabase
    .from('Post')
    .select('*')
    .eq('id', Number(context.params?.id));

  if (!data || !data[0]) return { notFound: true };

  const { id, title, category, content, created_at, thumbnail } = data[0];

  return {
    props: {
      id,
      title,
      category,
      content,
      created_at,
      thumbnail,
    },
  };
}) satisfies GetStaticProps<Post>;
