import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type MobileMenuLinkProps = {
  to: string;
  name: string;
  onClose: () => void;
};

const MobileMenuLink: React.FC<MobileMenuLinkProps> = ({
  to,
  name,
  onClose,
}) => {
  return (
    <Link href={to}>
      <div className="flex items-center" onClick={onClose}>
        <Icon as={MdKeyboardArrowRight} />
        <Text>{name}</Text>
      </div>
    </Link>
  );
};

const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  const session = useSession();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-4">
        <ModalHeader>メニュー</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col gap-4">
            <MobileMenuLink
              to="/profile"
              name="プロフィール"
              onClose={onClose}
            />
            <MobileMenuLink to="/cart" name="カート" onClose={onClose} />
            <MobileMenuLink
              to="/category"
              name="カテゴリー"
              onClose={onClose}
            />
            {session.data ? (
              <p onClick={() => signOut()}>サインアウト</p>
            ) : (
              <Link href="/signin">
                <p>サインイン</p>
              </Link>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MobileMenu;
