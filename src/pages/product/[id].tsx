import {
  Button,
  Center,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Category from "../../components/Category";
import Counter from "../../components/combination/Counter";
import ProductImages from "../../components/product/ProductImages";
import { useCartCounter } from "../../context/CartContext";
import { trpc } from "../../utils/trpc";

type Props = {
  id: number;
  cartId: string | null;
};

const ProductDetail: React.FC<Props> = ({ id, cartId }) => {
  const toast = useToast();
  const router = useRouter();
  const { data } = trpc.product.getSingle.useQuery({ id: Number(id) });
  const { mutate } = trpc.cart.regist.useMutation({
    onError: () =>
      toast({
        title: "System error is occured",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () => {
      toast({
        title: "Product added in cart",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      action.increase();
    },
  });
  const [, action] = useCartCounter();
  const [options, setOptions] = useState<{
    size: string | null;
    color: string | null;
    quantity: number;
  }>({ size: null, color: null, quantity: 1 });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "cart" && data) {
      cartId
        ? mutate({
            cartId,
            productId: Number(id),
            ...options,
            title: data.title,
            price: options.quantity * data.price,
          })
        : router.push("/");
    }
  };
  return (
    <div className="p-10 flex">
      <Category />
      <div>
        {/* <Image
          src={
            data?.thumbnail ??
            process.env.PRODUCT_DEFAULT_IMAGE ??
            "/assets/default.png"
          }
          width={500}
          height={500}
          layout="fixed"
        /> */}
        <ProductImages thumbnail={data?.thumbnail} images={data?.images} />
        <Center>
          <Text className="w-112">{data?.description}</Text>
        </Center>
      </div>
      <form method="POST" onSubmit={onSubmit}>
        <div className="p-12 w-128">
          <Text className="text-2xl font-bold mb-2">{data?.title}</Text>
          <Text className="text-2xl font-bold">￥{data?.price}</Text>
          {data?.size && data.size.length > 0 && (
            <div>
              <Text>Size</Text>
              <Select
                placeholder="please select"
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, size: e.target.value }))
                }
                required
              >
                {data.size.map((s: string) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>
          )}
          {data?.color && data.color.length > 0 && (
            <div>
              <Text>Color</Text>
              <Select
                placeholder="please select"
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, color: e.target.value }))
                }
                required
              >
                {data.color.map((c: string) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
          )}
          <div>
            <Text>Quantity</Text>
            <Center>
              <Counter
                count={options.quantity}
                onDecrease={() => {
                  if (options.quantity > 1)
                    setOptions((prev) => ({
                      ...prev,
                      quantity: prev.quantity - 1,
                    }));
                }}
                onIncrease={() => {
                  if (data?.quantity && options.quantity < data?.quantity)
                    setOptions((prev) => ({
                      ...prev,
                      quantity: prev.quantity + 1,
                    }));
                }}
              />
            </Center>
          </div>
          <VStack spacing={4}>
            <Button
              type="submit"
              name="cart"
              className="w-full"
              colorScheme="teal"
            >
              ADD CART
            </Button>
            <Button
              type="submit"
              name="purchase"
              className="w-full"
              colorScheme="teal"
            >
              PURCHASE
            </Button>
          </VStack>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const id = ctx.params?.id;
  const session = await getSession(ctx);
  const cartId = session?.cartId ?? null;
  return {
    props: {
      id,
      cartId,
    },
  };
};
