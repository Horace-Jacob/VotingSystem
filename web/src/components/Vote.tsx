import React, { useState } from "react";
import { useRadioGroup, useToast, Button, Stack } from "@chakra-ui/react";
import { useTeamQuery, useVoteMutation } from "../generated/graphql";
import { RadioCard } from "./RadioCard";

export const Vote = ({ regionId }: any) => {
  const [{ data, fetching }] = useTeamQuery({
    variables: {
      getTeamId: regionId,
    },
  });

  const [, vote] = useVoteMutation();

  const [myValue, setMyValue] = useState("");

  const toast = useToast();

  const handleChange = (value: any) => {
    setMyValue(value);
  };

  const handleButtonClick = async () => {
    if (myValue === "") {
      toast({
        title: "Please select one of the teams",
        status: "info",
        duration: 2000,
        position: "top",
      });
    } else {
      const response = await vote({ team: myValue });
      if (response.data?.vote === false) {
        toast({
          title: "You already have voted on this region",
          status: "warning",
          duration: 2000,
          position: "top",
        });
      } else if (response.data?.vote === true) {
        toast({
          title: `You have successfully voted on ${myValue}`,
          status: "success",
          duration: 2000,
          position: "top",
        });
      } else {
        toast({
          title: `Error Occurred while voting on ${myValue}`,
          status: "error",
          duration: 2000,
          position: "top",
        });
      }
    }
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <>
      <Stack {...group} align="center">
        {data?.getTeam?.map((t) => {
          const radio = getRadioProps({ value: t.team });
          if (t.regionId === regionId) {
            return (
              <RadioCard key={t.id} {...radio}>
                {t.team}
              </RadioCard>
            );
          } else {
            return null;
          }
        })}

        <Button
          justifyContent={"center"}
          onClick={handleButtonClick}
          justifyItems={"center"}
          m="4"
          ml="40"
          width="60"
          bgColor={"telegram.500"}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};
