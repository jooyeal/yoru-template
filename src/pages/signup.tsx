import React, { ChangeEvent, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Spacer,
  Text,
  Center,
  useToast,
  InputGroup,
  InputRightElement,
  Box,
  HStack,
} from "@chakra-ui/react";
import { trpc } from "../utils/trpc";
import {
  passwordSecurityCheck,
  PasswordSecurityLevel,
} from "../utils/caculate";
import { useRouter } from "next/router";

type Props = {};

const Signup: React.FC<Props> = () => {
  const toast = useToast();
  const router = useRouter();
  //state
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showInputMailCode, setShowInputMailCode] = useState<boolean>(false);
  const [passwordLevel, setPasswordLevel] = useState<{
    color: string;
    message: string;
    level: PasswordSecurityLevel;
  }>({
    color: "red.300",
    message: "低い",
    level: "weak",
  });
  const [email, setEmail] = useState<string>("");

  //trpc
  const { data, mutate: mailCodeMutate } = trpc.mail.sendMailCode.useMutation({
    onError: () => {
      toast({
        title: "メール送信に失敗しました。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      toast({
        title: "認証コードの送信を完了しました。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const { mutate } = trpc.user.regist.useMutation({
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSuccess: () => {
      toast({
        title: "会員登録完了しました。",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/signin");
    },
  });

  //listener
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const securityLevel = passwordSecurityCheck(e.target.value);
    switch (securityLevel) {
      case "medium":
        setPasswordLevel({
          color: "blue.300",
          message: "普通",
          level: "medium",
        });
        break;
      case "strong":
        setPasswordLevel({
          color: "green.400",
          message: "高い",
          level: "strong",
        });
        break;
      default:
        setPasswordLevel({ color: "red.300", message: "低い", level: "weak" });
    }
  };

  const onClickAuthentication = () => {
    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validEmailRegex)) {
      mailCodeMutate({ email });
      setShowInputMailCode(true);
    } else {
      toast({
        title: "正しいメール形式を入力してください。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    const mailCode = e.target.mailCode?.value;
    if (data) {
      if (password !== passwordConfirm) {
        toast({
          title: "パスワードが一致しません。",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (mailCode !== data.authCode) {
        toast({
          title: "メール認証コードが一致しません。",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (passwordLevel.level !== "strong") {
        toast({
          title: "パスワード安全性を高めてください。",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        mutate({ email, password });
      }
    } else {
      toast({
        title: "メール認証をしてください。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit}>
        <div className="w-80">
          <Center>
            <Text className="text-5xl font-bold">会員登録</Text>
          </Center>
          <Spacer h="10" />
          <FormControl>
            <FormLabel fontWeight="bold">メール</FormLabel>
            <InputGroup>
              <Input
                id="signup-email"
                name="email"
                type="email"
                pr="4rem"
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputRightElement width="4rem">
                <Button
                  colorScheme="teal"
                  h="1.75rem"
                  size="sm"
                  onClick={onClickAuthentication}
                >
                  送信
                </Button>
              </InputRightElement>
            </InputGroup>
            {showInputMailCode && (
              <Input
                id="mail-code"
                name="mailCode"
                type="text"
                placeholder="認証コードを入力してください"
              />
            )}
            <FormLabel fontWeight="bold">パスワード</FormLabel>
            <Input
              id="signup-password"
              name="password"
              type="password"
              onChange={onChangePassword}
            />
            <FormLabel fontWeight="bold">パスワード確認</FormLabel>
            <Input
              id="signup-password-confirm"
              name="passwordConfirm"
              type="password"
            />
            <Spacer h={4} />
            <Box className="border p-3 rounded">
              <HStack>
                <Box
                  width="33.3%"
                  height="2"
                  background={passwordLevel?.color}
                />
                {(passwordLevel?.level === "medium" ||
                  passwordLevel?.level === "strong") && (
                  <Box
                    width="33.3%"
                    height="2"
                    background={passwordLevel?.color}
                  />
                )}
                {passwordLevel?.level === "strong" && (
                  <Box
                    width="33.3%"
                    height="2"
                    background={passwordLevel?.color}
                  />
                )}
              </HStack>
              <Spacer h={4} />
              <Box className="flex items-center justify-center">
                <Text className="text-sm mr-5">安全性 :</Text>
                <Text color={passwordLevel?.color} fontWeight="bold">
                  {passwordLevel?.message}
                </Text>
              </Box>
            </Box>
            <Spacer h="5" />
            <Button className="w-full" colorScheme="teal" type="submit">
              SIGN UP
            </Button>
          </FormControl>
          <Spacer h="4" />
          <Center>
            <Text className="text-red-400">{errorMessage}</Text>
          </Center>
        </div>
      </form>
    </div>
  );
};

export default Signup;
