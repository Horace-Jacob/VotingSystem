import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import NextLink from "next/link";
import { useCreateAccountMutation } from "../generated/graphql";
import { ErrorMap } from "../utils/ErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { UrqlClient } from "../utils/UrqlClient";

const Register = () => {
  const [, createAccount] = useCreateAccountMutation();
  const router = useRouter();
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Sign Up Your Account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Button variant="link" colorScheme="blue">
                <NextLink href={"/login"}>Sign In</NextLink>
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <Formik
                initialValues={{
                  email: "",
                  username: "",
                  password: "",
                  secret: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await createAccount({ fields: values });
                  if (response.data?.createAccount.errors) {
                    setErrors(ErrorMap(response.data.createAccount.errors));
                  } else if (response.data?.createAccount.accounts) {
                    router.push("/login");
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <InputField
                      name="email"
                      placeholder="Enter Your Email"
                      label="Email"
                    />
                    <Box mt={4}>
                      <InputField
                        name="username"
                        placeholder="Enter Your Username"
                        label="Username"
                      />
                    </Box>
                    <Box mt={4}>
                      <InputField
                        name="secret"
                        type={"password"}
                        placeholder="Enter Your Secret Key"
                        label="Secret Key"
                      />
                    </Box>
                    <Box mt={4}>
                      <InputField
                        name="password"
                        type={"password"}
                        placeholder="Enter Your Password"
                        label="Password"
                      />
                    </Box>

                    <Stack spacing="6" mt="6">
                      <Button
                        variant={"primary"}
                        colorScheme={"telegram"}
                        bgColor={"teal.300"}
                        type={"submit"}
                        isLoading={isSubmitting}
                      >
                        Sign Up
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Stack>
            <Stack spacing="6">
              <HStack>
                <Divider />
                <Text
                  fontSize="md"
                  color="blue.200"
                  fontWeight={"bold"}
                  whiteSpace="nowrap"
                >
                  VOTING SYSTEM
                </Text>
                <Divider />
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default withUrqlClient(UrqlClient)(Register);
