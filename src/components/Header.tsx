import {
  Badge,
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSearch, BiUser, BiCart } from "react-icons/bi";
import { useCartCounter } from "../context/CartContext";
import SearchModal from "./SearchModal";

type Props = {};

const Header: React.FC<Props> = () => {
  const [count] = useCartCounter();
  const session = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="fixed w-full pl-4 pr-4 h-16 flex justify-between shadow-md bg-gray-200 z-50">
        <Link href="/">
          <div className="h-full flex items-center cursor-pointer">
            <Text className="font-bold text-lg">TEMPLATE</Text>
          </div>
        </Link>
        <form
          className="h-full flex items-center"
          method="GET"
          action="/search"
        >
          <Input
            type="text"
            placeholder="Search"
            variant="filled"
            name="title"
            roundedTopRight="none"
            roundedBottomRight="none"
            onClick={onOpen}
          />
          <IconButton
            icon={<BiSearch />}
            type="submit"
            aria-label="search product"
            roundedTopLeft="none"
            roundedBottomLeft="none"
          />
        </form>
        <div className="h-full flex items-center">
          <ButtonGroup>
            <div className="relative">
              <Link href="/cart">
                <IconButton icon={<BiCart />} aria-label="cart" />
              </Link>
              {count && count > 0 ? (
                <Badge
                  colorScheme="red"
                  rounded="full"
                  className="absolute -top-1 -right-1 z-50"
                >
                  {count}
                </Badge>
              ) : null}
            </div>
            {session.status === "authenticated" ? (
              <>
                <Link href="/profile">
                  <IconButton icon={<BiUser />} aria-label="profile" />
                </Link>
                <Button onClick={() => signOut()}>SIGN OUT</Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button>SIGN IN</Button>
                </Link>
                <Link href="/signup">
                  <Button>SIGN UP</Button>
                </Link>
              </>
            )}
            {session.data?.isAdmin ? (
              <Link href="/admin">
                <Button>ADMIN</Button>
              </Link>
            ) : null}
          </ButtonGroup>
        </div>
      </div>
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
