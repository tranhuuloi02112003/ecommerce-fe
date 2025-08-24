import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import { useRoutes } from "react-router-dom";

function App() {
    const routes = AppRoutes(); // lấy danh sách RouteObject

  return useRoutes(routes);
}

export default App;
