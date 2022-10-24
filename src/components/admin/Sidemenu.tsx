import { Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

type Props = {};
type ItemProps = {
  children: ReactNode;
  to: string;
};

const Item: React.FC<ItemProps> = ({ children, to }) => {
  return (
    <Link href={to}>
      <a>
        <div className="flex justify-between items-center hover:bg-gray-200 p-2">
          <Text className="uppercase">{children}</Text>
          <Icon color="GrayText" as={MdKeyboardArrowRight} />
        </div>
      </a>
    </Link>
  );
};
const Sidemenu: React.FC<Props> = () => {
  return (
    <div className="fixed pt-16 w-60 min-h-screen bg-gray-100 shadow-inner z-40">
      <div className="p-4">
        <Item to="/admin/categories">categories</Item>
        <Item to="/admin/products">products</Item>
        <Item to="/admin/campaigns">campaigns</Item>
      </div>
    </div>
  );
};

export default Sidemenu;
