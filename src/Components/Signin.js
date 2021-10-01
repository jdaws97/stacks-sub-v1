import React, { useEffect, useState } from "react";
import { Authenticate } from "./Authenticate";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { Box, Text, Button } from "@stacks/ui";
//import { getUserData, getAddress, personSession } from "./Authenticate";

export const Signin = () => {
  const [userData, setUserData] = useState();
  const [address, setAddress] = useState();

  return (
    <Box mt={[5, "60px"]}>
      <Button onClick={() => Authenticate()}>Get Started</Button>
      <h1></h1>
    </Box>
  );
};
