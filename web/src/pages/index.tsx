import { Navbar } from "../components/Navbar";
import {
  Container,
  Stack,
  Box,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Grid,
  GridItem,
  Divider,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useRegionsQuery } from "../generated/graphql";
import { Vote } from "../components/Vote";
import { withUrqlClient } from "next-urql";
import { UrqlClient } from "../utils/UrqlClient";

const Home = () => {
  const [{ fetching, data }] = useRegionsQuery();
  return (
    <>
      <Navbar />
      <Grid templateColumns="repeat(4, 1fr)" gap={10} m="10">
        {data?.getRegions.map((region) => {
          return (
            <GridItem
              w="100%"
              h="100%"
              bg="transparent"
              boxShadow={"md"}
              key={region.id}
            >
              <HStack>
                <Divider />
                <Text
                  fontSize="md"
                  color="blue.600"
                  fontWeight={"bold"}
                  whiteSpace="nowrap"
                  style={{
                    fontSize: "20px",
                  }}
                  fontFamily={"mono"}
                >
                  {region.region}
                </Text>

                <Divider />
              </HStack>
              <Vote regionId={region.id} />
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};

export default withUrqlClient(UrqlClient)(Home);
