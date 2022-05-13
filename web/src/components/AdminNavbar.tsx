import {
  Flex,
  HStack,
  Text,
  Button,
  Stack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {
  useAdminQuery,
  useLogoutMutation,
  useResetVoteQuery,
} from "../generated/graphql";
import { isServer } from "../utils/isServer";

export const AdminNavbar: React.FC<{}> = ({}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let body = null;
  const [{ data, fetching }] = useAdminQuery({
    pause: isServer(),
  });

  const toast = useToast();

  // const [{ fetching: resetVoteFetching }, resetVote] = useResetVoteQuery();

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  const logoutHandling = () => {
    logout();
    router.push("/admin/adminlogin");
  };

  // const resetVoteHandle = () => {
  //   resetVote();
  //   onClose();
  //   toast({
  //     title: "Vote Reset Complete",
  //     status: "success",
  //     duration: 2000,
  //     position: "top",
  //   });
  // };
  const signInHandle = () => {
    router.push("/admin/adminlogin");
  };
  if (!fetching) {
  } else if (!data?.admin) {
    body = <></>;
  }
  return (
    <Flex
      position={"sticky"}
      bg={"teal.100"}
      padding={4}
      top={0}
      zIndex={1}
      justify={"space-between"}
    >
      <HStack spacing="4">
        <Text
          fontSize="2xl"
          color="blue.900"
          fontWeight={"bold"}
          whiteSpace="nowrap"
        >
          Admin Dashboard
        </Text>
      </HStack>
      <HStack spacing="4">
        {data?.admin ? (
          <Text
            fontSize="2xl"
            color="blue.900"
            fontWeight={"bold"}
            whiteSpace="nowrap"
          >
            {" "}
            Hello, {data.admin.username}{" "}
          </Text>
        ) : (
          <Text
            fontSize="2xl"
            color="blue.900"
            fontWeight={"bold"}
            whiteSpace="nowrap"
          >
            {" "}
            Please Sign In{" "}
          </Text>
        )}
      </HStack>
      {/* <HStack>
        <Button
          width={"28"}
          height={"9"}
          variant={"primary"}
          colorScheme={"telegram"}
          bgColor={"red.500"}
          fontSize="lg"
          onClick={onOpen}
          isLoading={resetVoteFetching}
        >
          reset vote
        </Button>
      </HStack> */}
      <Stack spacing="4">
        {data?.admin ? (
          <Button
            width={"28"}
            height={"9"}
            variant={"primary"}
            colorScheme={"telegram"}
            bgColor={"teal.300"}
            fontSize="lg"
            onClick={logoutHandling}
            isLoading={logoutFetching}
          >
            Logout
          </Button>
        ) : (
          <Button
            width={"28"}
            height={"9"}
            variant={"primary"}
            colorScheme={"telegram"}
            bgColor={"teal.300"}
            fontSize="lg"
            onClick={signInHandle}
          >
            Sign In
          </Button>
        )}
      </Stack>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Vote Reset Action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This action cannot be undone.</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancle
            </Button>
            <Button
              variant="ghost"
              bgColor={"red.500"}
              onClick={resetVoteHandle}
            >
              Reset Vote
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </Flex>
  );
};
