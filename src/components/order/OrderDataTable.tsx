import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { OutputGetCart } from "../../schema/cart.schema";
type Props = {
  carts?: OutputGetCart;
};

const OrderDataTable: React.FC<Props> = ({ carts }) => {
  const toast = useToast();
  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    if (carts) {
      const totalPrice = carts.products?.reduce(
        (prev, curr) => prev + curr.price,
        0
      );
      setTotalPrice(totalPrice);
    }
  }, [carts]);
  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product title</Th>
              <Th>
                <p className="text-center">size</p>
              </Th>
              <Th>
                <p className="text-center">color</p>
              </Th>
              <Th isNumeric>quantity</Th>
              <Th isNumeric>price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {carts?.products?.map((product, index) => (
              <Tr key={index}>
                <Td>
                  <span className="font-bold">{product.title}</span>
                </Td>
                {product.size ? (
                  <Td>
                    size: <span className="font-bold ml-2">{product.size}</span>
                  </Td>
                ) : (
                  <Td>
                    <p className="text-center">-</p>
                  </Td>
                )}
                {product.color ? (
                  <Td>
                    color:
                    <span className="font-bold ml-2">{product.color}</span>
                  </Td>
                ) : (
                  <Td>
                    <p className="text-center">-</p>
                  </Td>
                )}
                <Td isNumeric>
                  <span className="font-bold">{product.quantity}</span>
                </Td>
                <Td isNumeric>
                  <span className="font-bold">{product.price}</span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Spacer h={10} />
        <div className="flex justify-end p-10">
          <Text className="text-2xl">Total:</Text>
          <Text className="text-2xl ml-2 font-bold">{totalPrice}</Text>
        </div>
      </TableContainer>
    </div>
  );
};

export default OrderDataTable;
