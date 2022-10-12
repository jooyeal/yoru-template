import { Text } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import OrderDataTable from "../../components/admin/orders/OrderDataTable";
import RevenueStat from "../../components/admin/orders/RevenueStat";
import { trpc } from "../../utils/trpc";

type Props = {
  isAdmin: boolean;
};

const Admin: React.FC<Props> = () => {
  const { data } = trpc.order.get.useQuery();
  const { data: ordersTodayData } = trpc.order.getOrdersToday.useQuery();
  console.log(ordersTodayData);
  return (
    <div className="p-10">
      <RevenueStat />
      <OrderDataTable orders={data} />
    </div>
  );
};

export default Admin;

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
