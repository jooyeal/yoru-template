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
        <div className="cursor-pointer hover:bg-gray-200 p-2 flex justify-between items-center w-55 rounded-mdr">
          <Text className="uppercase">{children}</Text>
          <Icon color="GrayText" as={MdKeyboardArrowRight} />
        </div>
      </a>
    </Link>
  );
};
const Sidemenu: React.FC<Props> = () => {
  return (
    <div className="flex justify-between">
      <div className="w-56 flex flex-col">
        <Item to="/profile">My details</Item>
        <Item to="/profile/addresses">My addresses</Item>
        <Item to="/profile/orders">My orders</Item>
      </div>
    </div>
  );
};

export default Sidemenu;
