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
  FormLabel,
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
            <ModalHeader>Create new product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Product title</FormLabel>
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
                <FormLabel>Product description</FormLabel>
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
                <FormLabel>discount mode</FormLabel>
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
                <FormLabel>discount price rate (%)</FormLabel>
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
                <FormLabel>price</FormLabel>
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
                <FormLabel>quantity</FormLabel>
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
                <FormLabel>category</FormLabel>
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
                <FormLabel>thumbnail</FormLabel>
                <input
                  type="file"
                  onChange={(e) => {
                    if (e.target.files) setThumbnail(e.target.files[0]);
                  }}
                />
                <FormLabel>other images</FormLabel>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0)
                      setImages(e.target.files);
                  }}
                />
                <FormLabel>Other options</FormLabel>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Sizes
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
                          ADD
                        </Button>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Colors
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
                          ADD
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
