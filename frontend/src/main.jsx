import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ShopContext from "./context/ShopContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContext>
      <App />
    </ShopContext>
  </BrowserRouter>
);

