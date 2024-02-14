import { cn } from '@/utils/style';
import { FC } from 'react';

type CategoriesProps = {
  selected: string;
  categories: string[];
  onCategorySelect: (category: string) => void;
};

const Categories: FC<CategoriesProps> = ({
  categories,
  selected,
  onCategorySelect,
}) => {
  return (
    <div className='flex flex-wrap gap-4 justify-center'>
      <div
        onClick={() => onCategorySelect('All')}
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
          onClick={() => onCategorySelect(category)}
          className={cn(
            'text-slate-400 cursor-pointer',
            selected === category && 'font-semibold text-black'
          )}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Categories;
