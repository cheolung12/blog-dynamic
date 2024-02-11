import { cn } from "@/utils/style";
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Link from "next/link";
import { FC } from "react";
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from "react-icons/ai";
import IconButton from "./IconButton";

type SidebarProps = {
  isOpen: boolean;
  close: () => void;
};

const supabase = createClient();

const Sidebar: FC<SidebarProps> = ({ isOpen, close }) => {
  const { data: existingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('category');
      return Array.from(new Set(data?.map((d) => d.category)));
    }
  });
  
  return (
    <div
      className={cn(
        "min-h-screen absolute z-10 flex-col gap-6 border-r bg-white p-10 pr-6 text-base lg:relative",
        isOpen ? "flex" : "hidden",
      )}
    >
      <div className="flex justify-end cursor-pointer lg:hidden">
        <IconButton Icon={AiOutlineClose} onClick={close} />
      </div>
      <Link href="/" className="w-48 font-medium text-gray-600 hover:underline">
        홈
      </Link>
      <Link
        href="/tags"
        className="w-48 font-medium text-gray-600 hover:underline"
      >
        태그
      </Link>
      {existingCategories?.map((category) => (
        <Link
        href={`/category/${category}`}
        key={category}
        className="w-48 font-medium text-gray-600 hover:underline"
      >
        Web Development
      </Link>
      ))}
      
      <div className="mt-10 flex items-center gap-4">
        <IconButton
          Icon={AiFillGithub}
          component={Link}
          href="https://github.com/cheolung12"
        />
        <IconButton
          Icon={AiFillInstagram}
          component={Link}
          href="https://www.instagram.com/cheolung__/"
        />
      </div>
    </div>
  );
};

export default Sidebar;
