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
              <Th>
                <p className="text-center">quantity</p>
              </Th>
              <Th>
                <p className="text-center">price</p>
              </Th>
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
                    <p className="font-bold text-center">{product.size}</p>
                  </Td>
                ) : (
                  <Td>
                    <p className="text-center">-</p>
                  </Td>
                )}
                {product.color ? (
                  <Td>
                    <p className="font-bold text-center">{product.color}</p>
                  </Td>
                ) : (
                  <Td>
                    <p className="text-center">-</p>
                  </Td>
                )}
                <Td>
                  <p className="font-bold text-center">{product.quantity}</p>
                </Td>
                <Td>
                  <p className="font-bold text-center">{product.price}</p>
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
