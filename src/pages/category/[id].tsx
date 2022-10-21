import { Select, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import Category from "../../components/Category";
import ProductCard from "../../components/combination/ProductCard";
import Paging from "../../components/Paging";
import { trpc } from "../../utils/trpc";

type Props = {
  id: string;
  name: string;
  page: string;
};

const CategoryDetail: React.FC<Props> = ({ id, name, page }) => {
  const [selected, setSelected] = useState<OrderFilterType>("NORMAL");
  const { data } = trpc.product.getProductsByCategoryId.useQuery({
    id: Number(id),
    filter: selected,
    page: Number(page),
  });

  return (
    <div className="p-10 flex">
      <div className="mobile:hidden">
        <Category />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <Text className="text-3xl mobile:text-2xl font-bold">{name}</Text>
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
          <div className="p-6 flex flex-wrap gap-4 mobile:justify-center">
            {data?.length === 0 && (
              <Text className="font-bold p-2">商品がありません。</Text>
            )}
            {data?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                url={product.thumbnail}
                title={product.title}
                price={product.price}
                discount={product.discount}
                discountRate={product.discountRate}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <Paging
            pagingFor="category"
            startNum={1}
            categoryName={name}
            id={Number(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const id = ctx.params?.id;
  const name = ctx.query?.name;
  const page = ctx.query?.page;
  return {
    props: {
      id,
      name,
      page,
    },
  };
};
