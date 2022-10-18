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
  Text,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
import useDebounce from "../hooks/useDebounce";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const debounceTitle = useDebounce({ value: title, delay: 1000 });
  const { data, isLoading, refetch } = trpc.product.searchByTitle.useQuery({
    title: debounceTitle,
  });

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setTitle("");
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search products</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form action="/search">
              <FormControl>
                <Input
                  id="product-title"
                  name="title"
                  type="text"
                  placeholder="search..."
                  onChange={(e) => {
                    setTitle(e.target.value);
                    refetch();
                  }}
                />
              </FormControl>
            </form>
            <Spacer h={4} />
            <div>
              {isLoading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                data?.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <div
                      className="p-2 h-10 flex items-center cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setTitle("");
                        onClose();
                      }}
                    >
                      <Icon as={MdKeyboardArrowRight} />
                      <Text>{product.title}</Text>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setTitle("");
                onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SearchModal;
