import { Center, Select, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import ProductCard from "../../components/combination/ProductCard";
import Paging from "../../components/Paging";
import { trpc } from "../../utils/trpc";

type Props = {
  title: string;
  page: string;
};

const Search: React.FC<Props> = ({ title, page }) => {
  const [selected, setSelected] = useState<OrderFilterType>("NORMAL");
  const { data } = trpc.product.searchByTitle.useQuery({
    title,
    filter: selected,
    page: Number(page),
  });

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <Text className="text-3xl mobile:text-2xl font-bold">検索結果</Text>
        <div className="w-48">
          <Select
            onChange={(e) => setSelected(e.target.value as OrderFilterType)}
          >
            <option value={"NORMAL"}>選択してください</option>
            <option value={"PRICE_HIGH"}>価格が高い順</option>
            <option value={"PRICE_LOW"}>価格が安い順</option>
          </Select>
        </div>
      </div>
      <div>
        <div className="p-6 flex flex-wrap mobile:justify-center gap-4">
          {data?.length === 0 && (
            <Text className="text-xl">商品がありません。</Text>
          )}
          {data?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              discount={product.discount}
              discountRate={product.discountRate}
              url={product.thumbnail}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Paging pagingFor="search" title={title} startNum={Number(page)} />
        </div>
      </div>
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  return {
    props: {
      title: ctx.query.title,
      page: ctx.query.page,
    },
  };
};
