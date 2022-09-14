import React from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import { Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import reset from "./resetCss";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Global styles={reset} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  </>,
);
