import React from "react";
import env from "../../environment-configuration";
import ApiPane from "components/ApiPane";
import { Container } from "./components";

const Home = () => (
  <Container container>
    Welcome to Stacks-react app! your current environment is: {env.NODE_ENV}{" "}
    <br />
    <br />
    <br />
    <ApiPane />
  </Container>
);

export default Home;
