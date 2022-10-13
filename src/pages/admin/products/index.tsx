import { Button, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import AddModal from "../../../components/admin/products/AddModal";
import ProductDataTable from "../../../components/admin/products/ProductDataTable";
import { trpc } from "../../../utils/trpc";

type Props = {};

const Products = (props: Props) => {
  const { data: categoriesData } = trpc.category.get.useQuery();
  const { data: productsData, refetch } = trpc.product.get.useQuery();
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      refetch();
    },
  });
  return (
    <div className="p-10">
      <div className="flex justify-between">
        <Text className="font-bold text-3xl">Products</Text>
        <Button colorScheme="teal" onClick={onOpen}>
          ADD PRODUCT
        </Button>
      </div>
      <Spacer h="10" />
      <ProductDataTable products={productsData} refetch={refetch} />
      <AddModal isOpen={isOpen} onClose={onClose} categories={categoriesData} />
    </div>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const isAdmin = session?.isAdmin;
  if (!isAdmin)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  return {
    props: {
      isAdmin: isAdmin,
    },
  };
};
