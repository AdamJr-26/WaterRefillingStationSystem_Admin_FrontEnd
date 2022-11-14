import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    blue: {
      900: "#2389DA",
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
});

export default theme;
