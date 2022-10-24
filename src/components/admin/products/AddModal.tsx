import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
  VStack,
  Spinner,
  Switch,
  Text,
} from "@chakra-ui/react";
import { trpc } from "../../../utils/trpc";
import useCloudinaryUpload from "../../../hooks/useCloudinaryUpload";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categories: Array<{ id: number; name: string }> | undefined;
};

const formDataInit = {
  title: "",
  description: "",
  discount: false,
  discountRate: null,
  thumbnail: "",
  images: [],
  price: 0,
  quantity: 0,
  categoryId: 0,
  recommend: false,
};
const optionsTextInit = { size: "", color: "" };
const optionsInit = { sizes: [], colors: [] };

const AddModal: React.FC<Props> = ({ isOpen, onClose, categories }) => {
  const toast = useToast();
  const [optionsText, setOptionsText] = useState<{
    size: string;
    color: string;
  }>(optionsTextInit);
  const [options, setOptions] = useState<{
    sizes: string[] | [];
    colors: string[] | [];
  }>(optionsInit);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    discount: boolean;
    discountRate: number | null;
    thumbnail: string;
    images: string[];
    price: number;
    quantity: number;
    categoryId: number;
    recommend: boolean;
  }>(formDataInit);
  const [thumbnail, setThumbnail] = useState<File>();
  const [images, setImages] = useState<FileList>();
  const { isLoading, upload } = useCloudinaryUpload({
    thumbnail,
    images,
  });

  const { mutate } = trpc.product.regist.useMutation({
    onError: (error) => {
      toast({
        title: "Failed create.",
        status: "error",
        description: error.message,
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: "New product created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      setFormData(formDataInit);
      setOptions(optionsInit);
      setOptionsText(optionsTextInit);
    },
  });

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const size = options.sizes;
      const color = options.colors;
      const uploadData = await upload();
      mutate({
        ...formData,
        size,
        color,
        thumbnail: uploadData.thumbnail,
        images: uploadData.images,
      });
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
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form method="POST" onSubmit={onSubmit}>
            <ModalHeader>新規商品作成</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <Text className="font-bold">商品タイトル</Text>
                <Input
                  id="product-title"
                  name="title"
                  type="text"
                  maxLength={50}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  required
                />
                <Text className="font-bold">商品の説明</Text>
                <Textarea
                  className="resize-none"
                  id="product-description"
                  name="description"
                  rows={20}
                  maxLength={2000}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  required
                />
                <Spacer h="5" />
                <Text className="font-bold">おすすめモードの選択</Text>
                <Switch
                  isChecked={formData.recommend}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      recommend: !prev?.recommend,
                    }))
                  }
                />
                <Spacer h="5" />
                <Text className="font-bold">値下げモードの選択</Text>
                <RadioGroup
                  name="productDiscount"
                  defaultValue="off"
                  onChange={(value) =>
                    value === "off"
                      ? setFormData((prev) => ({ ...prev, discount: false }))
                      : setFormData((prev) => ({ ...prev, discount: true }))
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: Number(e.target.value),
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: Number(e.target.value),
                    }))
                  }
                  required
                />
                <Spacer h="5" />
                <Text className="font-bold">数量</Text>
                <Input
                  id="product-quantity"
                  name="quantity"
                  type="number"
                  placeholder="20"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: Number(e.target.value),
                    }))
                  }
                  required
                />
                <Spacer h="5" />
                <Text className="font-bold">カテゴリー</Text>
                <Select
                  id="product-category"
                  name="categoryId"
                  placeholder="Select category"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [e.target.name]: Number(e.target.value),
                    }))
                  }
                  required
                >
                  {categories?.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <Spacer h="5" />
                <Text className="font-bold">代表画像</Text>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) setThumbnail(e.target.files[0]);
                  }}
                />
                <Text className="font-bold">他の画像</Text>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0)
                      setImages(e.target.files);
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
                        className="border-gray-200 border rounded mb-2 p-2"
                        minHeight="10"
                      >
                        <VStack spacing={4}>
                          {options.sizes.map((size, index) => (
                            <Tag key={index} size="sm">
                              <TagLabel>{size}</TagLabel>
                              <TagCloseButton
                                onClick={() =>
                                  setOptions((prev) => {
                                    const newOptions = prev.sizes.filter(
                                      (s) => s !== size
                                    );
                                    return { ...prev, sizes: newOptions };
                                  })
                                }
                              />
                            </Tag>
                          ))}
                        </VStack>
                      </Box>
                      <Stack direction="row" alignItems="center">
                        <Input
                          size="sm"
                          type="text"
                          placeholder="typing size"
                          value={optionsText.size}
                          onChange={(e) =>
                            setOptionsText((prev) => ({
                              ...prev,
                              size: e.target.value,
                            }))
                          }
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            setOptions((prev) => ({
                              ...prev,
                              sizes: [...prev.sizes, optionsText.size],
                            }));
                            setOptionsText((prev) => ({ ...prev, size: "" }));
                          }}
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
                        className="border-gray-200 border rounded mb-2 p-2"
                        minHeight="10"
                      >
                        <VStack spacing={4}>
                          {options.colors.map((color, index) => (
                            <Tag key={index} size="sm">
                              <TagLabel>{color}</TagLabel>
                              <TagCloseButton
                                onClick={() =>
                                  setOptions((prev) => {
                                    const newOptions = prev.colors.filter(
                                      (c) => c !== color
                                    );
                                    return { ...prev, colors: newOptions };
                                  })
                                }
                              />
                            </Tag>
                          ))}
                        </VStack>
                      </Box>
                      <Stack direction="row" alignItems="center">
                        <Input
                          size="sm"
                          type="text"
                          placeholder="typing color"
                          value={optionsText.color}
                          onChange={(e) =>
                            setOptionsText((prev) => ({
                              ...prev,
                              color: e.target.value,
                            }))
                          }
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            setOptions((prev) => ({
                              ...prev,
                              colors: [...prev.colors, optionsText.color],
                            }));
                            setOptionsText((prev) => ({ ...prev, color: "" }));
                          }}
                        >
                          追加
                        </Button>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" type="submit">
                CREATE
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Modal isOpen={isLoading} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image uploading...</ModalHeader>
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

export default AddModal;
