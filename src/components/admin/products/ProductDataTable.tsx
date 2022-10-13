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
  Badge,
} from "@chakra-ui/react";
import { TableProduct } from "../../../schema/product.schema";
import DeleteModal from "./DeleteModal";
import Link from "next/link";

type Props = {
  products?: TableProduct;
  refetch: () => void;
};

const DataTable: React.FC<Props> = ({ products, refetch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => refetch(),
  });
  const [selected, setSelected] = useState<number>(0);

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Product title</Th>
              <Th>Discount</Th>
              <Th>Price</Th>
              <Th>Quantity</Th>
              <Th>Category</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>{product.title}</Td>
                <Td>
                  {product.discount ? (
                    <Badge colorScheme="red">on sale</Badge>
                  ) : (
                    <Badge>normal</Badge>
                  )}
                </Td>
                <Td>{product.price}</Td>
                <Td>{product.quantity}</Td>
                <Td>{product.category.name}</Td>
                <Td isNumeric>
                  <ButtonGroup>
                    <Link href={`/admin/products/edit/${product.id}`}>
                      <Button size="sm" colorScheme="teal">
                        EDIT
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelected(product.id);
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
      <DeleteModal isOpen={isOpen} onClose={onClose} selected={selected} />
    </div>
  );
};

export default DataTable;
