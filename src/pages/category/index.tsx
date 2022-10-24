import { Box, Icon, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { trpc } from "../../utils/trpc";
import { MdKeyboardArrowRight } from "react-icons/md";

type Props = {};

const CategoryList = (props: Props) => {
  const { data } = trpc.category.get.useQuery();
  return (
    <Box className="laptop:p-10 mobile:pt-10">
      <Box className="p-6">
        <Text className="font-bold text-3xl">カテゴリー選択</Text>
        <Spacer h={6} />
        <Box className="flex flex-col gap-2 border p-4 rounded">
          {data?.map((category) => (
            <Link
              key={category.id}
              href={{
                pathname: `category/${category.id}`,
                query: { name: category.name, page: 1 },
              }}
            >
              <Box className="flex items-center border-b pb-2">
                <Icon as={MdKeyboardArrowRight} />
                <Box className="font-bold">{category.name}</Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryList;
