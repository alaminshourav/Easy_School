import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./util/theme.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
}

export default App;
