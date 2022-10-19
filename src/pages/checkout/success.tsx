import { useToast } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import { useCartCounter } from "../../context/CartContext";
import { trpc } from "../../utils/trpc";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY);

type Props = {
  id: string;
  cartData: string[];
  userEmail: string;
  totalPrice: number;
};

const Success: React.FC<Props> = ({ id, cartData, userEmail, totalPrice }) => {
  const toast = useToast();
  const [, action] = useCartCounter();
  const { mutate } = trpc.order.regist.useMutation({
    onError: () => {
      toast({
        title: "既に注文されています。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      action.setCount(0);
    },
    onSuccess: () => {
      action.setCount(0);
    },
  });
  useEffect(() => {
    mutate({ stripeSessionId: id, userEmail, totalPrice, cartData });
  }, []);
  return <div>Success</div>;
};

export default Success;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await stripe.checkout.sessions.retrieve(
    ctx.query.session_id,
    { expand: ["line_items"] }
  );
  const cartData = session.metadata.ids.split(",");
  cartData.shift();
  return {
    props: {
      id: session.id,
      cartData,
      userEmail: session.customer_email,
      totalPrice: session.amount_total,
    },
  };
};
