import Categories from '@/components/Categories';
import PostList from '@/components/PostList';
import { useCategories } from '@/utils/hooks';
import { useState } from 'react';

export default function AllPosts() {
  const { data: categories } = useCategories();
  const [selected, setSelected] = useState('All');
  const onCategorySelect = (category: string): void => {
    setSelected(category);
  };

  return (
    <div className='flex flex-col'>
      <Categories
        categories={categories || []}
        selected={selected}
        onCategorySelect={onCategorySelect}
      />
      <PostList category={selected} />
    </div>
  );
}
