import React, { useEffect, useState } from "react";
import Sidemenu from "../../../components/profile/Sidemenu";
import {
    Text, Icon, Box, Input, Button, Spacer, InputGroup, InputRightElement
  } from "@chakra-ui/react";

const Order: React.FC = () => {
    return (
        <div className="min-h-screen pl-60 pr-60">
            <Text className="font-bold text-3xl p-10">My Account</Text>
            <div className="flex justify-between">
                <Sidemenu />
                <Box w="50rem" h="100rem" bg="gray.100" rounded="md" p="10" shadow="lg">
                    aaa
                </Box>
            </div>
        </div>
    );
  };
  
export default Order;