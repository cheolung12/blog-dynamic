import PostList from '@/components/PostList';
import { useCategories } from '@/utils/hooks';
import { cn } from '@/utils/style';
import { useState } from 'react';

export default function AllPosts() {
  const { data: categories } = useCategories();
  const [selected, setSelected] = useState('All');
  const handleCategoryClick = (category: string): void => {
    setSelected(category);
  };

  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap gap-4 justify-center'>
        <div
          onClick={() => handleCategoryClick('All')}
          className={cn(
            'text-slate-400 cursor-pointer',
            selected === 'All' && 'font-semibold text-black'
          )}
        >
          All
        </div>
        {categories?.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={cn(
              'text-slate-400 cursor-pointer',
              selected === category && 'font-semibold text-black'
            )}
          >
            {category}
          </div>
        ))}
      </div>
      <PostList category={selected}/>
    </div>
  );
}
