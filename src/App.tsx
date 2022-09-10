import React from "react";
import { Global } from "@emotion/react";
import reset from "./resetCss";

const App = () => {
  return (
    <>
      <Global styles={reset} />
    </>
  );
};

export default App;
