import { Button, Spacer, Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CartDataTable from "../../components/cart/CartDataTable";
import { OutputGetCart } from "../../schema/cart.schema";
import { trpc } from "../../utils/trpc";

type Props = {
  cartId: string;
};

const Cart: React.FC<Props> = ({ cartId }) => {
  const { data, refetch } = trpc.cart.get.useQuery({ cartId });
  const [carts, setCarts] = useState<OutputGetCart>();
  useEffect(() => {
    setCarts({ products: data?.products ?? null });
  }, [data]);

  return (
    <div className="laptop:p-10 mobile:pt-10">
      <Text className="text-3xl font-bold">Cart</Text>
      <Spacer h={10} />
      <CartDataTable carts={carts} refetch={refetch} />
      <div className="flex justify-end laptop:pr-10">
        <Link
          href={{
            pathname: "/order",
            query: { cartId },
          }}
        >
          <Button colorScheme="teal">TO ORDER DETAILS</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  const cartId = session?.cartId ?? null;
  if (!cartId)
    return {
      redirect: {
        permanent: false,
        destination: "/authority",
      },
      props: {},
    };
  return {
    props: {
      cartId,
    },
  };
};
