import { Button, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import AddModal from "../../../components/admin/categories/AddModal";
import CategoryDataTable from "../../../components/admin/categories/CategoryDataTable";
import { trpc } from "../../../utils/trpc";

type Props = {};

const Categories: React.FC<Props> = () => {
  const { data, refetch } = trpc.category.get.useQuery();
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => refetch(),
  });

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <Text className="font-bold text-3xl">Categories</Text>
        <Button colorScheme="teal" onClick={onOpen}>
          ADD CATEGORY
        </Button>
      </div>
      <Spacer h="10" />
      <CategoryDataTable categories={data} refetch={refetch} />
      <AddModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Categories;

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
