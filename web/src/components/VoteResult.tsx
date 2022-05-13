import {
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import React from "react";
import { useGetVoteQuery } from "../generated/graphql";

export default function VoteResult() {
  const [{ data }] = useGetVoteQuery();
  return (
    <TableContainer>
      {data?.getVote.map((v) => (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Region</Th>
              <Th>Team</Th>
              <Th isNumeric>result</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{v.regions.region}</Td>
              <Td>{v.team}</Td>
              <Td isNumeric>{v.vote}</Td>
            </Tr>
          </Tbody>
        </Table>
      ))}
    </TableContainer>
  );
}
