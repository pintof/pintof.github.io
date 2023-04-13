import { ThemeProvider } from "styled-components";

const theme = {
  baseball: {
    color: "lightblue",
    backgroundColor: "lightblue",
  },
  basketball: {
    color: "pink",
    backgroundColor: "pink",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
