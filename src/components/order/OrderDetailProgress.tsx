import { Box, Circle, HStack, Spacer, Square, Text } from "@chakra-ui/react";
import { OrderStatus } from "@prisma/client";
import React from "react";
import { FaDotCircle } from "react-icons/fa";

type Props = {
  status?: OrderStatus;
};

const OrderDetailProgress: React.FC<Props> = ({ status }) => {
  return (
    <Box>
      <HStack>
        <Square size="32">
          <Box className="w-full h-full flex flex-col items-center justify-center">
            <Circle
              color={`${
                status === "PAYMENT_PROCEED" ? "teal.500" : "gray.400"
              }`}
            >
              <FaDotCircle />
            </Circle>
            <Text className="font-bold text-sm mt-10">決済待ち</Text>
          </Box>
          <Box className="border w-20 h-0" />
        </Square>
        <Square size="32">
          <Box className="w-full h-full flex flex-col items-center justify-center">
            <Circle
              color={`${
                status === "PAYMENT_SUCCESS" ? "teal.500" : "gray.400"
              }`}
            >
              <FaDotCircle />
            </Circle>
            <Text className="font-bold text-sm mt-10">決済完了</Text>
          </Box>
          <Box className="border w-20 h-0" />
        </Square>
        <Square size="32">
          <Box className="w-full h-full flex flex-col items-center justify-center">
            <Circle
              color={`${status === "DELIVERY_READY" ? "teal.500" : "gray.400"}`}
            >
              <FaDotCircle />
            </Circle>
            <Text className="font-bold text-sm mt-10">配送準備中</Text>
          </Box>
          <Box className="border w-20 h-0" />
        </Square>
        <Square size="32">
          <Box className="w-full h-full flex flex-col items-center justify-center">
            <Circle
              color={`${
                status === "DELIVERY_PROCEED" ? "teal.500" : "gray.400"
              }`}
            >
              <FaDotCircle />
            </Circle>
            <Text className="font-bold text-sm mt-10">配送中</Text>
          </Box>
          <Box className="border w-20 h-0" />
        </Square>
        <Square size="32">
          <Box className="w-full h-full flex flex-col items-center justify-center">
            <Circle
              color={`${
                status === "DELIVERY_SUCCESS" ? "teal.500" : "gray.400"
              }`}
            >
              <FaDotCircle />
            </Circle>
            <Text className="font-bold text-sm mt-10">配送完了</Text>
          </Box>
          <Box className="border w-20 h-0" />
        </Square>
        <Square size="32">
          <Box className="w-full h-full flex flex-col items-center justify-center">
            <Circle
              color={`${status === "ORDER_CANCEL" ? "teal.500" : "gray.400"}`}
            >
              <FaDotCircle />
            </Circle>
            <Text className="font-bold text-sm mt-10">キャンセル</Text>
          </Box>
          <Box className="border w-20 h-0" />
        </Square>
        <Square size="32">
          <Box className="w-full h-full flex flex-col items-center justify-center">
            <Circle
              color={`${
                status === "PROGRESS_FINISHIED" ? "teal.500" : "gray.400"
              }`}
            >
              <FaDotCircle />
            </Circle>
            <Text className="font-bold text-sm mt-10">取引完了</Text>
          </Box>
          <Box className="w-20 h-0" />
        </Square>
      </HStack>
    </Box>
  );
};

export default OrderDetailProgress;
