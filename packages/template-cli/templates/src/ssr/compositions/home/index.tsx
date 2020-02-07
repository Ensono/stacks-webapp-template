import React, { useEffect, useState } from "react";
import api from "constants/apis/menu";
import axios from "axios";

const Home = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const myapi = api("getMenuList");
      const res = await axios({
        url: myapi.internalEndpoint(1),
        method: myapi.method
      });
      setState(res.data);
    }
    fetchData();
    return function cleanup() {
      console.log("the DailyQuote component has unmounted");
    };
  }, []);
  return (
    <div>
      Welcome to Stacks-react app! your current environment is:{" "}
      {process.env.NODE_ENV} <br />
      <br />
      <br />
      {state && <code>{JSON.stringify(state.results)}</code>}
    </div>
  );
};
export default Home;
