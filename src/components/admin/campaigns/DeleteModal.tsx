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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selected: number | undefined;
  refetch: () => void;
};

const DeleteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selected,
  refetch,
}) => {
  const toast = useToast();
  const { mutate: deleteMutate } = trpc.campaign.delete.useMutation({
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
        title: "Campaign deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      refetch();
    },
  });
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do you want to delete this category?</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              CLOSE
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                if (selected) {
                  deleteMutate({ id: selected });
                } else {
                  toast({
                    title: "Failed delete.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
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
