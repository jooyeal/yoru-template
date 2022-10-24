import { Button, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {};

const Authority = (props: Props) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <Text className="font-bold text-3xl mobile:text-lg mb-4">
        サインインが必要なサービスになります。
      </Text>
      <Link href="/signin">
        <Button colorScheme="teal">サインイン画面へ</Button>
      </Link>
    </div>
  );
};

export default Authority;
