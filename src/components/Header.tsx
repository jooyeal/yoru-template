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
import React from "react";
import { BiSearch, BiUser, BiCart, BiMenu } from "react-icons/bi";
import { useCartCounter } from "../context/CartContext";
import MobileMenu from "./MobileMenu";
import SearchModal from "./SearchModal";

type Props = {};

const Header: React.FC<Props> = () => {
  const [count] = useCartCounter();
  const session = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: menuIsOpen,
    onOpen: menuOnOpen,
    onClose: menuOnClose,
  } = useDisclosure();
  return (
    <>
      <div className="fixed w-full pl-4 pr-4 h-16 flex justify-between shadow-md bg-gray-200 z-50">
        <div className="h-full flex items-center laptop:hidden">
          <IconButton
            aria-label="mobile-menu"
            icon={<BiMenu />}
            onClick={menuOnOpen}
          />
        </div>
        <Link href="/">
          <div className="h-full flex items-center cursor-pointer">
            <Text className="font-bold text-lg">TEMPLATE</Text>
          </div>
        </Link>
        <div className="h-full flex items-center">
          <Input
            className="mobile:hidden"
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
            onClick={onOpen}
          />
        </div>
        <div className="h-full flex items-center mobile:hidden">
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
                <Button onClick={() => signOut()}>サインアウト</Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button>サインイン</Button>
                </Link>
                <Link href="/signup">
                  <Button>会員登録</Button>
                </Link>
              </>
            )}
            {session.data?.isAdmin ? (
              <Link href="/admin">
                <Button>管理画面</Button>
              </Link>
            ) : null}
          </ButtonGroup>
        </div>
      </div>
      <MobileMenu isOpen={menuIsOpen} onClose={menuOnClose} />
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
