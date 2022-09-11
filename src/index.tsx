import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { Global } from "@emotion/react";
import reset from "./resetCss";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <>
    <RecoilRoot>
      <Global styles={reset} />
      <App />
    </RecoilRoot>
  </>,
);
