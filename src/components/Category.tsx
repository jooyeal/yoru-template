import { Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { trpc } from "../utils/trpc";

type Props = {};
type ItemProps = {
  children: ReactNode;
  to: string;
  name: string;
};

const Item: React.FC<ItemProps> = ({ children, to, name }) => {
  return (
    <Link href={{ pathname: to, query: { name, page: 1 } }}>
      <a className="cursor-pointer hover:bg-gray-200 p-2 flex justify-between items-center w-40 rounded-md">
        <Text className="">{children}</Text>
        <Icon color="GrayText" as={MdKeyboardArrowRight} />
      </a>
    </Link>
  );
};

const Category: React.FC<Props> = () => {
  const { data } = trpc.category.get.useQuery();
  return (
    <div className="w-56 flex flex-col">
      {data?.map((category, index) => (
        <Item key={index} to={`/category/${category.id}`} name={category.name}>
          {category.name}
        </Item>
      ))}
    </div>
  );
};

export default Category;
