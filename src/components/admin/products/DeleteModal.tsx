import React from "react";
import {
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { trpc } from "../../../utils/trpc";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selected: number;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  selected,
}) => {
  const toast = useToast();
  const { mutate: deleteMutate } = trpc.product.delete.useMutation({
    onError: () => {
      toast({
        title: "Failed delete.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: "Product deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
  });
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do you want to delete this product?</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              CLOSE
            </Button>
            <Button
              variant="ghost"
              onClick={() => deleteMutate({ id: selected })}
            >
              DELETE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteModal;
