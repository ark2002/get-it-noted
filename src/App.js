import "./App.css";
import { Footer, Navbar } from "./frontend/components";
import { LandingPage } from "./frontend/pages";
import { Router } from "./frontend/routing/Router";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
