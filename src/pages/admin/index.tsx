import { Spacer } from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import OrderDataTable from "../../components/admin/orders/OrderDataTable";
import RevenueStat from "../../components/admin/orders/RevenueStat";
import { trpc } from "../../utils/trpc";
import dynamic from "next/dynamic";
const RevenueChart = dynamic(
  () => import("../../components/admin/orders/RevenueChart"),
  {
    ssr: false,
  }
);
type Props = {
  isAdmin: boolean;
};

const Admin: React.FC<Props> = () => {
  const { data } = trpc.order.get.useQuery();
  const { data: statData } = trpc.order.getOrdersToday.useQuery();
  const { data: ordersMonthlyData } = trpc.order.getOrdersMonthly.useQuery();
  return (
    <div className="p-10">
      <RevenueChart monthlyOrders={ordersMonthlyData} />
      <Spacer h={6} />
      <RevenueStat statData={statData} />
      <Spacer h={6} />
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
