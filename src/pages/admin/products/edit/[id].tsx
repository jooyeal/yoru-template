import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  Spacer,
  useToast,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Text,
  Modal,
  Spinner,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Switch,
} from "@chakra-ui/react";
import { trpc } from "../../../../utils/trpc";
import { useRouter } from "next/router";
import useCloudinaryUpload from "../../../../hooks/useCloudinaryUpload";
import Image from "next/image";

type Props = {
  id: string;
};

const ProductEdit: React.FC<Props> = ({ id }) => {
  const toast = useToast();
  const router = useRouter();

  //trpc
  const { data: categoriesData } = trpc.category.get.useQuery();
  const { data } = trpc.product.getSingle.useQuery({ id });
  const { mutate } = trpc.product.edit.useMutation({
    onError: (error) =>
      toast({
        title: "Failed.",
        status: "error",
        description: error.message,
        duration: 5000,
        isClosable: true,
      }),
    onSuccess: () => {
      toast({
        title: "Product edited.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/admin/products");
    },
  });

  //States
  const [options, setOptions] = useState<{
    sizes?: string[];
    colors?: string[];
  }>({ sizes: data?.size ?? [], colors: data?.color ?? [] });
  const [optionsText, setOptionsText] = useState<{
    sizes: string;
    colors: string;
  }>({
    sizes: "",
    colors: "",
  });
  const [selectValue, setSelectValue] = useState<{
    discount?: boolean;
    discountRate?: number | null;
    categoryId?: number;
    recommend?: boolean;
  }>();
  const [thumbnail, setThumbnail] = useState<string>("/assets/default.png");
  const [images, setImages] = useState<string[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [imageFiles, setImageFiles] = useState<FileList>();
  const { isLoading, upload } = useCloudinaryUpload({
    thumbnail: thumbnailFile,
    images: imageFiles,
  });

  useEffect(() => {
    if (data) {
      setOptions({ sizes: data.size, colors: data.color });
      setSelectValue({
        discount: data.discount,
        discountRate: data.discountRate,
        categoryId: data.categoryId,
        recommend: data.recommend,
      });
      setThumbnail(data.thumbnail);
      setImages(data.images);
    }
  }, [data]);

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      let uploadData = null;
      if (
        (thumbnail && thumbnail === process.env.PRODUCT_DEFAULT_IMAGE) ||
        (images && images.length === 0)
      ) {
        uploadData = await upload();
      }

      const editInfo = {
        id,
        title: String(e.target.title.value) ?? "",
        description: String(e.target.description.value) ?? "",
        recommend: selectValue?.recommend ?? false,
        discount: selectValue?.discount ?? false,
        discountRate: selectValue?.discountRate ?? null,
        price: Number(e.target.price.value),
        quantity: Number(e.target.quantity.value),
        categoryId: selectValue?.categoryId ?? 0,
        size: options.sizes ?? [],
        color: options.colors ?? [],
        thumbnail:
          uploadData &&
          uploadData.thumbnail !== process.env.PRODUCT_DEFAULT_IMAGE
            ? uploadData.thumbnail
            : thumbnail,
        images:
          uploadData && uploadData.images.length !== 0
            ? uploadData.images
            : images,
      };
      mutate(editInfo);
    } catch (e) {
      toast({
        title: "Image upload failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="p-10">
      <Text className="text-3xl">商品情報の変更</Text>
      <Spacer h="10" />
      <form method="POST" onSubmit={onSubmit}>
        <FormControl>
          <Text className="font-bold">商品ナンバー</Text>
          <Input
            id="product-id"
            name="id"
            type="text"
            placeholder="please input unique id"
            defaultValue={data?.id}
            maxLength={12}
            disabled
          />
          <Text className="font-bold">商品タイトル</Text>
          <Input
            id="product-title"
            name="title"
            type="text"
            maxLength={50}
            defaultValue={data?.title}
            required
          />
          <Text className="font-bold">商品の説明</Text>
          <Textarea
            className="resize-none"
            id="product-description"
            name="description"
            rows={20}
            maxLength={2000}
            defaultValue={data?.description}
            required
          />
          <Spacer h="5" />
          <Text className="font-bold">おすすめモードの選択</Text>
          <Switch
            isChecked={selectValue?.recommend}
            onChange={() =>
              setSelectValue((prev) => ({
                ...prev,
                recommend: !prev?.recommend,
              }))
            }
          />
          <Spacer h="5" />
          <Text className="font-bold">値下げモードの選択</Text>
          <RadioGroup
            id="product-productDiscount"
            name="discount"
            value={selectValue?.discount ? "on" : "off"}
            onChange={(value) =>
              setSelectValue((prev) => ({
                ...prev,
                discount: value === "on" ? true : false,
              }))
            }
          >
            <Stack direction="row">
              <Radio value="off">off</Radio>
              <Radio value="on">on</Radio>
            </Stack>
          </RadioGroup>
          <Spacer h="5" />
          <Text className="font-bold">値下げ率の選択(%)</Text>
          <Select
            id="product-discount-rate"
            name="discountRate"
            placeholder="Select rate"
            value={selectValue?.discountRate ?? ""}
            onChange={(e) =>
              setSelectValue((prev) => ({
                ...prev,
                discountRate: Number(e.target.value),
              }))
            }
          >
            <option value={5}>5%</option>
            <option value={10}>10%</option>
            <option value={15}>15%</option>
            <option value={20}>20%</option>
            <option value={25}>25%</option>
            <option value={30}>30%</option>
            <option value={35}>35%</option>
            <option value={40}>40%</option>
            <option value={45}>45%</option>
            <option value={50}>50%</option>
            <option value={55}>55%</option>
            <option value={60}>60%</option>
            <option value={65}>65%</option>
            <option value={70}>70%</option>
            <option value={75}>75%</option>
            <option value={80}>80%</option>
            <option value={85}>85%</option>
            <option value={90}>90%</option>
            <option value={95}>95%</option>
          </Select>
          <Spacer h="5" />
          <Text className="font-bold">価格</Text>
          <Input
            id="product-price"
            name="price"
            type="number"
            placeholder="3500"
            defaultValue={data?.price}
            required
          />
          <Spacer h="5" />
          <Text className="font-bold">数量</Text>
          <Input
            id="product-quantity"
            name="quantity"
            type="number"
            placeholder="20"
            defaultValue={data?.quantity}
            required
          />
          <Spacer h="5" />
          <Text className="font-bold">カテゴリー</Text>
          <Select
            id="product-category"
            name="category"
            placeholder="Select category"
            value={selectValue?.categoryId}
            onChange={(e) =>
              setSelectValue((prev) => ({
                ...prev,
                categoryId: Number(e.target.value),
              }))
            }
            required
          >
            {categoriesData?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <Spacer h="5" />
          <Text className="font-bold">代表画像</Text>
          {thumbnail && <Image src={thumbnail} width={200} height={200} />}
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) setThumbnailFile(e.target.files[0]);
            }}
          />
          <Text className="font-bold">他の画像</Text>
          {images &&
            images.map((image, index) => (
              <Image key={index} src={image} width={200} height={200} />
            ))}
          <input
            type="file"
            multiple
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0)
                setImageFiles(e.target.files);
            }}
          />
          <Text className="font-bold">オプションの選択と追加</Text>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    サイズ
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel p={4}>
                <Box
                  className="border-gray-200 border rounded mb-2 p-2 flex flex-wrap gap-2"
                  minHeight="10"
                >
                  {options?.sizes?.map((size, index) => (
                    <Tag key={index} size="sm">
                      <TagLabel>{size}</TagLabel>
                      <TagCloseButton
                        onClick={() =>
                          setOptions((prev) => {
                            const newOptions = prev.sizes?.filter(
                              (s) => s !== size
                            );
                            return { ...prev, sizes: newOptions };
                          })
                        }
                      />
                    </Tag>
                  ))}
                </Box>
                <Stack direction="row" alignItems="center">
                  <Input
                    size="sm"
                    type="text"
                    placeholder="typing size"
                    onChange={(e) =>
                      setOptionsText((prev) => ({
                        ...prev,
                        sizes: e.target.value,
                      }))
                    }
                  />
                  <Button
                    size="sm"
                    onClick={() =>
                      setOptions((prev) => {
                        if (prev.sizes) {
                          return {
                            ...prev,
                            sizes: [...prev.sizes, optionsText.sizes],
                          };
                        } else {
                          return { ...prev };
                        }
                      })
                    }
                  >
                    追加
                  </Button>
                </Stack>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    色
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box
                  className="border-gray-200 border rounded mb-2 p-2 flex flex-wrap gap-2"
                  minHeight="10"
                >
                  {options?.colors?.map((color, index) => (
                    <Tag key={index} size="sm">
                      <TagLabel>{color}</TagLabel>
                      <TagCloseButton
                        onClick={() =>
                          setOptions((prev) => {
                            const newOptions = prev.colors?.filter(
                              (c) => c !== color
                            );
                            return { ...prev, colors: newOptions };
                          })
                        }
                      />
                    </Tag>
                  ))}
                </Box>
                <Stack direction="row" alignItems="center">
                  <Input
                    size="sm"
                    type="text"
                    placeholder="typing color"
                    onChange={(e) =>
                      setOptionsText((prev) => ({
                        ...prev,
                        colors: e.target.value,
                      }))
                    }
                  />
                  <Button
                    size="sm"
                    onClick={() =>
                      setOptions((prev) => {
                        if (prev.colors) {
                          return {
                            ...prev,
                            colors: [...prev.colors, optionsText.colors],
                          };
                        } else {
                          return { ...prev };
                        }
                      })
                    }
                  >
                    追加
                  </Button>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </FormControl>
        <Spacer h="10" />
        <Button type="submit" className="w-full" colorScheme="teal">
          更新
        </Button>
      </form>
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
    </div>
  );
};

export default ProductEdit;

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
      id: ctx.params?.id,
    },
  };
};
