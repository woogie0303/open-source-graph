import { Navbar } from "./components/Navbar";

import { Outlet } from "react-router";
import "./index.css";
import RootLayout from "./layout/RootLayout";
import Provider from "./Provider";

function App() {
  return (
    <Provider>
      <RootLayout>
        <Navbar />
        <Outlet />
      </RootLayout>
    </Provider>
  );
}

export default App;
