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
} from "@chakra-ui/react";
import React from "react";
import { trpc } from "../../../utils/trpc";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();

  const { mutate } = trpc.campaign.regist.useMutation({
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
        title: "New campaign created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const thumbnail = "/assets/banner_sample.jpg";
    mutate({ title, description, thumbnail });
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form method="POST" onSubmit={onSubmit}>
            <ModalHeader>Create new campaign</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Campaign title</FormLabel>
                <Input id="category-name" name="title" type="text" required />
                <Spacer h="5" />
                <FormLabel>Campaign title</FormLabel>
                <Textarea
                  className="resize-none"
                  id="category-name"
                  name="description"
                  required
                />
                <Spacer h="5" />
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
    </div>
  );
};

export default AddModal;
