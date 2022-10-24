import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import Stars from "../../../../../components/review/Stars";
import useCloudinaryUpload from "../../../../../hooks/useCloudinaryUpload";
import { trpc } from "../../../../../utils/trpc";

type Props = {
  productId: string;
  orderId: string;
  email: string;
};

const RegistReview: React.FC<Props> = ({ productId, orderId, email }) => {
  const toast = useToast();
  //state
  const [score, setScore] = useState<number>(0);
  const [image, setImage] = useState<File>();
  const { isLoading, upload } = useCloudinaryUpload({ thumbnail: image });

  //trpc
  const { data } = trpc.product.getSingle.useQuery({ id: productId });
  const { data: reviewData } = trpc.review.checkAlreadyRegisted.useQuery({
    orderId,
    productId,
  });
  const { mutate } = trpc.review.regist.useMutation({
    onError: () =>
      toast({
        title: "レビュー登録に失敗しました。",
        status: "error",
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () =>
      toast({
        title: "レビュー登録を完了しました。",
        status: "success",
        duration: 5000,
        isClosable: true,
      }),
  });

  //functions
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.reviewTitle.value;
    const description = e.target.reviewDesc.value;
    if (!reviewData?.isRegisted) {
      const uploadData = await upload();
      mutate({
        userEmail: email,
        orderId,
        productId,
        score,
        image: uploadData.thumbnail,
        title,
        description,
      });
    } else {
      toast({
        title: "該当レビューは既に登録されています。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container className="p-10">
      <Box className="p-6 border rounded-lg w-full">
        <FormLabel fontSize="xl" fontWeight="bold">
          商品名
        </FormLabel>
        <Text>{data?.title}</Text>
        <Spacer h={4} />
        <form className="w-full" onSubmit={onSubmit}>
          <FormControl>
            <FormLabel fontSize="xl" fontWeight="bold">
              評価
            </FormLabel>
            <Stars score={score} setScore={setScore} />
            <Spacer h={4} />

            <FormLabel fontSize="xl" fontWeight="bold">
              タイトル
            </FormLabel>
            <Input name="reviewTitle" type="text" maxLength={50} required />
            <Spacer h={4} />

            <FormLabel fontSize="xl" fontWeight="bold">
              商品画像
            </FormLabel>
            <input
              type="file"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
              required
            />
            <Spacer h={4} />

            <FormLabel fontSize="xl" fontWeight="bold">
              内容
            </FormLabel>
            <Textarea
              className="resize-none"
              name="reviewDesc"
              maxLength={3000}
              rows={15}
              required
            />
          </FormControl>
          <Spacer h={4} />
          <Button type="submit" width="full" colorScheme="teal">
            提出
          </Button>
        </form>
      </Box>
      <Modal isOpen={isLoading} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>登録中...</ModalHeader>
          <ModalBody>
            <div className="flex justify-center items-center h-40">
              <Spinner size="lg" />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default RegistReview;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const productId = ctx.params?.productId;
  const orderId = ctx.params?.orderId;
  const email = ctx.params?.email;
  return {
    props: {
      productId,
      orderId,
      email,
    },
  };
};
