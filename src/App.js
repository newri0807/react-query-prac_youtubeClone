import "./App.css";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { useState } from "react";

function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  return (
    <div className="w-full lg:px-[10rem] md:px-1 mx-auto bg-[#18181b] text-slate-50">
      <Nav quotaExceeded={quotaExceeded} />
      <Outlet
        quotaExceeded={quotaExceeded}
        setQuotaExceeded={setQuotaExceeded}
      />
    </div>
  );
}

export default App;
