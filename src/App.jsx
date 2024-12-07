import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNav from "./components/MyNav";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:city" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
