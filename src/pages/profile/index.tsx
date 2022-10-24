import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import {
  Text, Box, Input, Button, Spacer, InputGroup, InputRightElement, ButtonGroup, useToast, FormControl, FormLabel
} from "@chakra-ui/react";
import { trpc } from "../../utils/trpc";
import { useSession, getSession} from "next-auth/react";
import Sidemenu from "../../components/profile/Sidemenu";
import { useRouter } from "next/router";

type Props = {
  email: string;
};

const Profile: React.FC<Props> = ({ email }) => {
  const { data, refetch } = trpc.user.get.useQuery({email: email})
  const [show, setShow] = React.useState(false)
  const [edit, setEdit] = React.useState(true)
  const handleClick = () => setShow(!show)
  const editText = () => setEdit(!edit)
  const toast = useToast();
  const router = useRouter();

  const onSubmit = (e: any) => {
    e.preventDefault();
    const editInfo = {
      email: String(e.target.email.value) ?? "",
      password: String(e.target.password.value) ?? "",
    };
    mutate(editInfo);
    setEdit(!edit)
    setShow(false)
  };

  const {mutate} = trpc.user.edit.useMutation({
    onError: (error) =>
      toast({
        title: "Failed.",
        status: "error",
        description: error.message,
        duration: 5000,
      }),
    onSuccess: () => {
      toast({
        title: "Product edited.",
        status: "success",
        duration: 5000,
      });
      router.push("/profile");
    },
  });
  
  return (
    <div className="min-h-screen pl-60 pr-60">
      <Text className="font-bold text-3xl p-10">My Account</Text>
      <div className="flex justify-between">
        <Sidemenu />
        <Box w="50rem" h="100rem" bg="gray.100" rounded="md" p="10" shadow="lg">
          <form method="POST" onSubmit={onSubmit}>
            <div className="flex justify-between">
              <Text className="font-bold text-2xl pb-5">My details</Text>
              <ButtonGroup>
                {edit ? <Button w="100px" colorScheme="green" onClick={editText}>edit</Button> 
                : <><Button w="100px" colorScheme="red" onClick={editText}>cancel</Button>
                  <Button type="submit" w="100px" colorScheme="blue">save</Button></>}
              </ButtonGroup>
            </div>
            <FormControl>
              <FormLabel>email</FormLabel>
              <Input
                id="user-email"
                name="email"
                type="text"
                bg="white"
                defaultValue={data?.email}
                disabled={true}
                onChange={()=>{}}/>
              <Spacer h="5" />
              <FormLabel>password</FormLabel>
              <InputGroup size='md'>
                <Input 
                  id="user-password"
                  name="password"
                  type={show ? 'text' : 'password'}
                  bg="white"
                  defaultValue={data?.password}
                  disabled={edit}
                  onChange={()=>{}}/>
                <InputRightElement width='4.5rem'>
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Profile;

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
