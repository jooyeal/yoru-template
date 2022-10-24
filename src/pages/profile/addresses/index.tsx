import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { getSession} from "next-auth/react";
import Sidemenu from "../../../components/profile/Sidemenu";
import {
    Text, Box, Button, useDisclosure,
  } from "@chakra-ui/react";
import AddModal from "../../../components/profile/addresses/AddModel";
import { trpc } from "../../../utils/trpc";

type Props = {
    email: string;
};

const Addresses: React.FC<Props> = ({ email }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <div className="min-h-screen pl-60 pr-60">
        <Text className="font-bold text-3xl p-10">My Account</Text>
        <div className="flex justify-between">
          <Sidemenu />
            <Box w="50rem" h="100rem" bg="gray.100" rounded="md" p="10" shadow="lg">
                <div className="flex justify-between">
                    <Text className="font-bold text-2xl pb-5">My Addresses</Text>
                    <Button onClick={onOpen} colorScheme="teal">add address</Button>
                    <AddModal isOpen={isOpen} onClose={onClose} email={email}/>
                </div>
                
            </Box>
        </div>
      </div>
    );
  };
  
export default Addresses;

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
  ) => {
    const session = await getSession(ctx);
    const email = session?.user?.email
    console.log(session)
    return {
      props: {
        email
      },
    };
  };