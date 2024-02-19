import Link from "next/link";
import { FC } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import IconButton from "./IconButton";

const Footer: FC = () => {
  return (
    <footer className="flex justify-between border-t p-4 font-medium">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="pr-1 text-sm lg:pr-2 lg:text-base">ABOUT ME</div>
        <div className="text-xs text-gray-500 lg:text-sm">
          프론트엔드 엔지니어 홍철웅
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="pr-1 text-sm lg:pr-2 lg:text-base">ADMIN</div>
        <IconButton
          Icon={RiAdminLine}
          component={Link}
          href="/admin"
          className="text-gray-500 hover:text-gray-600"
        />
        <IconButton
          Icon={BsPencilSquare}
          component={Link}
          href="/write"
          className="text-gray-500 hover:text-gray-600"
          label='write'
        />
      </div>
    </footer>
  );
};

export default Footer;
