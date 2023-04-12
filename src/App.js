import "./App.css";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="w-full lg:px-[10rem] md:px-1 mx-auto bg-[#18181b] text-slate-50">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
