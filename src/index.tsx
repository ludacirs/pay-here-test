import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Global } from "@emotion/react";
import { RecoilRoot } from "recoil";
import reset from "./resetCss";
import App from "./App";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Global styles={reset} />
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </>,
);
