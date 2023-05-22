import React from 'react';
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Bdg from "./Pages/bdg";
import Bdg2 from "./Pages/bdg2";
import Bdg3 from "./Pages/bdg3";
import Bdg4 from "./Pages/bdg4";
import {
  Navbar,
  Typography,
} from "@material-tailwind/react"
import G from "./Pages/g";
function App() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Pages
          </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Account
          </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Blocks
          </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">
            Docs
          </a>
        </Typography>
      </ul>
  );

  return (
    <div className="bg-blue-gray-50 min-h-screen min-w-full">
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Material Tailwind
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
          </div>
        </div>
      </Navbar>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/g" element={<G/>}/>
            <Route path="/bdg" element={<Bdg/>}/>
            <Route path="/bdg2" element={<Bdg2/>}/>
            <Route path="/bdg3" element={<Bdg3/>}/>
            <Route path="/bdg4" element={<Bdg4/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
