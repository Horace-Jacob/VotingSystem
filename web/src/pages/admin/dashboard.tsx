import { Grid } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { AddTeam } from "../../components/AddTeam";
import { AdminNavbar } from "../../components/AdminNavbar";
import VoteResult from "../../components/VoteResult";
import { UrqlClient } from "../../utils/UrqlClient";

const Dashboard = () => {
  return (
    <>
      <AdminNavbar />
      <AddTeam />
      <VoteResult />
    </>
  );
};

export default withUrqlClient(UrqlClient)(Dashboard);
