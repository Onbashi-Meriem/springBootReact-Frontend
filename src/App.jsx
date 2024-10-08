import { Outlet } from "react-router-dom";
import { LanguageSelector } from "./shared/components/languageSelector";
import { Navbar } from "./shared/components/Navbar";
import { AuthenticationContext } from "@/shared/state/context";

function App() {
  return (
    <AuthenticationContext>
      <Navbar />
      <div className="container">
        <Outlet />
        <LanguageSelector />
      </div>
    </AuthenticationContext>
  );
}

export default App;
