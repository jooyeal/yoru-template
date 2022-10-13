import { Center, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import ProductCard from "../../components/combination/ProductCard";
import { trpc } from "../../utils/trpc";

type Props = {
  title: string;
};

const Search: React.FC<Props> = ({ title }) => {
  const { data } = trpc.product.searchByTitle.useQuery({ title });
  if (data?.length === 0)
    return (
      <div className="p-10">
        <Text className="text-3xl font-bold">Search result</Text>
        <div className="flex justify-center items-center">
          <Text className="font-bold">No result...</Text>
        </div>
      </div>
    );
  return (
    <div className="p-10">
      <Text className="text-3xl font-bold">Search result</Text>
      <div className="p-6 flex flex-wrap">
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
    },
  };
};
