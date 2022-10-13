import React from "react";
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
  Text,
  Spacer,
} from "@chakra-ui/react";
import { OutputGetOrdersSchema } from "../../../schema/order.schema";
import {
  convertDateToString,
  getOrderProgressColor,
} from "../../../utils/caculate";

type Props = {
  orders: OutputGetOrdersSchema | undefined;
};

const OrderDataTable: React.FC<Props> = ({ orders }) => {
  return (
    <div className="p-4">
      <Text className="font-bold text-2xl">Order status</Text>
      <Spacer h={6} />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>order no.</Th>
              <Th>order price</Th>
              <Th>status</Th>
              <Th>order date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.totalPrice}</Td>
                <Td>
                  <Badge colorScheme={getOrderProgressColor(order.status)}>
                    {order.status}
                  </Badge>
                </Td>
                <Td>{convertDateToString(new Date(order.createdAt))}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderDataTable;
