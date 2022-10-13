import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { Category } from "@prisma/client";

type Props = {
  categories?: Category[];
  refetch: () => void;
};

const DataTable: React.FC<Props> = ({ categories, refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: editOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  const [selected, setSelected] = useState<string>("");

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Category name</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories?.map((category, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{category.name}</Td>
                <Td isNumeric>
                  <ButtonGroup>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      onClick={() => {
                        setSelected(category.name);
                        editOnOpen();
                      }}
                    >
                      EDIT
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelected(category.name);
                        onOpen();
                      }}
                    >
                      DELETE
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <EditModal
        isOpen={editOpen}
        onClose={editOnClose}
        selected={selected}
        refetch={refetch}
      />
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        selected={selected}
        refetch={refetch}
      />
    </div>
  );
};

export default DataTable;
