import { Box, Button, useToast, Stack, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useCreateTeamMutation, useRegionsQuery } from "../generated/graphql";
import InputField from "./InputField";

export const AddTeam = () => {
  const [{ data }] = useRegionsQuery();
  const [, createTeam] = useCreateTeamMutation();
  const toast = useToast();
  return (
    <Box
      cursor="pointer"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      px={5}
      py={3}
      width={"80"}
      justifyContent="center"
      justifyItems="center"
      alignItems={"center"}
      margin="2.5"
    >
      <Stack pb={"6"} pl="14">
        <Text fontWeight={"bold"} fontSize="2xl">
          Create Team
        </Text>
      </Stack>
      <Formik
        initialValues={{
          team: "",
          regionId: "1",
        }}
        onSubmit={async (values) => {
          const response = await createTeam({
            team: values.team,
            regionId: parseInt(values.regionId),
          });
          if (!response.error) {
            toast({
              status: "success",
              title: "Team has been added successfully",
              duration: 2000,
              position: "top",
            });
          } else {
            toast({
              status: "warning",
              title: "Team already exists",
              duration: 2000,
              position: "top",
            });
          }
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack>
              <Field
                component="select"
                id="regionId"
                name="regionId"
                multiple={false}
              >
                {data?.getRegions.map((r) => (
                  <option value={r.id} key={r.id}>
                    {r.region}
                  </option>
                ))}
              </Field>
            </Stack>

            <Stack pt={"1.5"}>
              <InputField name="team" placeholder="Enter Team Name" required />
            </Stack>
            <Stack spacing={8} pt="1.5">
              <Button
                variant={"primary"}
                colorScheme={"telegram"}
                bgColor={"teal.300"}
                type={"submit"}
                isLoading={isSubmitting}
              >
                Add Team
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
