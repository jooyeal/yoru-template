import { Button, Spacer, Text, useToast } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import OrderDataTable from "../components/order/OrderDataTable";
import { redirectToStripe } from "../services/stripe";
import { trpc } from "../utils/trpc";

type Props = {
  userEmail: string;
  cartId: string;
};

const Order: React.FC<Props> = ({ userEmail, cartId }) => {
  const toast = useToast();
  const { data } = trpc.cart.get.useQuery({ cartId });

  const onClick = async () => {
    if (data?.products) {
      const result = await redirectToStripe({ cartData: data, userEmail });
      if (result?.error) {
        toast({
          title: "注文に進めませんでした。",
          description: result?.error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="p-10">
      <Text className="text-3xl font-bold">注文詳細</Text>
      <Spacer h={10} />
      <OrderDataTable carts={data} />
      <Button className="w-full" colorScheme="teal" onClick={onClick}>
        注文へ
      </Button>
    </div>
  );
};

export default Order;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const userEmail = session?.user?.email;
  const cartId = session?.cartId;
  if (!userEmail || !cartId)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  return {
    props: {
      userEmail,
      cartId,
    },
  };
};
