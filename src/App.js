import { useLocation } from "react-router-dom";

import { Footer, Navbar, Sidebar } from "./frontend/components";
import { Router } from "./frontend/routing/Router";

import "./App.css";

const sidebarRestrict = (pathname) => {
  if ((pathname === "/") || (pathname === "/signin") || (pathname === "/signup")) {
    return false;
  } else {
    return true;
  }
}

const flexToggle = (pathname) => {
  if (sidebarRestrict(pathname)) {
    return "flex--row";
  }
  else {
    return "";
  }
}

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar searchRestrict={sidebarRestrict} />
      <div className={flexToggle(location.pathname)}>
        {sidebarRestrict(location.pathname) && <Sidebar />}
        <Router />
      </div>
      <Footer />
    </div>
  );
}

export default App;
