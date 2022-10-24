import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { OrderStatus } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import OrderDetailProgress from "../../../components/order/OrderDetailProgress";
import { trpc } from "../../../utils/trpc";

type Props = {
  id: string;
};

const OrderDetail: React.FC<Props> = ({ id }) => {
  const toast = useToast();
  //state
  const [status, setStatus] = useState<OrderStatus>();

  //trpc
  const { data, refetch } = trpc.order.getSingle.useQuery({ id });
  const { mutate: mailMutate } = trpc.mail.sendReviewRequest.useMutation();
  const { data: mutateData, mutate } = trpc.order.editOrderStatus.useMutation({
    onError: () =>
      toast({
        title: "注文状況変更に失敗しました。",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () => {
      toast({
        title: "注文状況変更を完了しました。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      refetch();
    },
  });

  useEffect(() => {
    if (data) setStatus(data.status);
  }, [data]);

  useEffect(() => {
    if (mutateData?.status === "PROGRESS_FINISHIED") {
      if (data) {
        const orderProducts = data.products.map((product) => ({
          id: product.productId,
          title: product.title,
        }));
        mailMutate({
          email: data.userEmail,
          products: orderProducts,
          orderId: id,
        });
      } else {
        toast({
          title: "購入フロー完了メールの送信に失敗しました。",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [mutateData]);

  const onClickChangeOrderStatus = () => {
    if (status) {
      mutate({ id, status });
    } else {
      toast({
        title: "注文状況変更に失敗しました。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="p-10">
      <Text className="font-bold text-3xl">注文詳細</Text>
      <div className="p-6">
        <Text className="font-bold text-2xl uppercase">注文番号</Text>
        <Text>{id}</Text>
        <Spacer h={6} />
        <Text className="font-bold text-2xl uppercase">注文状況</Text>
        <OrderDetailProgress status={data?.status} />
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" className="font-bold">
                  注文状況の変更
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel p={4}>
              <HStack>
                <RadioGroup
                  value={status}
                  onChange={(value: OrderStatus) => setStatus(value)}
                >
                  <Stack direction="row">
                    <Radio colorScheme="teal" value="PAYMENT_PROCEED">
                      決済待ち
                    </Radio>
                    <Radio colorScheme="teal" value="PAYMENT_SUCCESS">
                      決済完了
                    </Radio>
                    <Radio colorScheme="teal" value="DELIVERY_READY">
                      配送準備中
                    </Radio>
                    <Radio colorScheme="teal" value="DELIVERY_PROCEED">
                      配送中
                    </Radio>
                    <Radio colorScheme="teal" value="DELIVERY_SUCCESS">
                      配送完了
                    </Radio>
                    <Radio colorScheme="teal" value="ORDER_CANCEL">
                      キャンセル
                    </Radio>
                    <Radio colorScheme="teal" value="PROGRESS_FINISHIED">
                      取引完了
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Button
                  colorScheme="teal"
                  size="sm"
                  onClick={onClickChangeOrderStatus}
                >
                  更新
                </Button>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default OrderDetail;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const id = ctx.params?.id;
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
      id,
    },
  };
};
