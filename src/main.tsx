import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/chakra.theme";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/Auth/AuthContext";
import { AnnouncementProvider } from "./contexts/Announcement/AnnouncementContexts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <AnnouncementProvider>
            <App />
          </AnnouncementProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
