import { Spacer, Text } from "@chakra-ui/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Category from "../components/Category";
import ProductCard from "../components/combination/ProductCard";
import { trpc } from "../utils/trpc";

const Home: React.FC = () => {
  const { data } = trpc.product.getRecommend.useQuery();
  const { data: campaigns } = trpc.campaign.get.useQuery();
  return (
    <div className="bg-gray-50">
      <Head>
        <title>e-commerce template</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spacer h={20} />
      <Banner campaigns={campaigns} />
      <div className="flex pb-20 laptop:pl-40 laptop:pr-40 pt-16 mobile:pr-2 mobile:pl-2">
        <div className="mobile:hidden">
          <Category />
        </div>
        <div className="mobile:overflow-hidden mobile:p-4">
          <Text className="font-bold text-3xl mobile:text-2xl">
            おすすめの商品
          </Text>
          <Spacer h={6} />
          <div className="flex laptop:flex-wrap gap-4 mobile:overflow-auto ">
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
      </div>
    </div>
  );
};

export default Home;
