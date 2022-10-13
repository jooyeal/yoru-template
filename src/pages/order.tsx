import { Button, Spacer, Text, useToast } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import OrderDataTable from "../components/order/OrderDataTable";
import { useCartCounter } from "../context/CartContext";
import { trpc } from "../utils/trpc";

type Props = {
  userEmail: string;
  cartId: string;
};

const Order: React.FC<Props> = ({ userEmail, cartId }) => {
  const toast = useToast();
  const [, action] = useCartCounter();
  const { data } = trpc.cart.get.useQuery({ cartId });
  const { mutate } = trpc.order.regist.useMutation({
    onError: () =>
      toast({
        title: "System error is occured",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () => {
      toast({
        title: "Order success",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      action.setCount(0);
    },
  });
  const onClick = () => {
    if (data?.products) {
      const totalPrice = data.products.reduce(
        (prev, curr) => prev + curr.price,
        0
      );
      const cartData = data.products.map((product) => product.id);
      mutate({
        userEmail,
        totalPrice,
        cartData,
      });
    }
  };
  return (
    <div className="p-10">
      <Text className="text-3xl font-bold">Order details</Text>
      <Spacer h={10} />
      <OrderDataTable carts={data} />
      <Button className="w-full" colorScheme="teal" onClick={onClick}>
        ORDER
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
