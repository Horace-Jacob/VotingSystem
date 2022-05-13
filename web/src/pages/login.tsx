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
import { useLoginMutation } from "../generated/graphql";
import { ErrorMap } from "../utils/ErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { UrqlClient } from "../utils/UrqlClient";

const Login = () => {
  const [, login] = useLoginMutation();
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
              Sign In Your Account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button variant="link" colorScheme="blue">
                <NextLink href={"/register"}>Sign Up</NextLink>
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
                  password: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  const response = await login(values);
                  if (response.data?.login.errors) {
                    setErrors(ErrorMap(response.data.login.errors));
                  } else if (response.data?.login.accounts) {
                    router.push("/");
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
                        name="password"
                        type={"password"}
                        placeholder="Enter Your Password"
                        label="Password"
                      />
                    </Box>

                    <Box mt={4}>
                      <HStack justify="space-between">
                        <Button variant="link" colorScheme="blue" size="sm">
                          Forgot password?
                        </Button>
                      </HStack>
                    </Box>

                    <Stack spacing="6" mt="4">
                      <Button
                        variant={"primary"}
                        colorScheme={"telegram"}
                        bgColor={"teal.300"}
                        type={"submit"}
                        isLoading={isSubmitting}
                      >
                        Sign In
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

export default withUrqlClient(UrqlClient)(Login);
