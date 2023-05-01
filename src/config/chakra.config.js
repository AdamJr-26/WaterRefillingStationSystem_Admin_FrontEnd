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
        bg: "#FBFBFB",
      },
    },
  },
});

export default theme;
