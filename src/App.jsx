import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/product";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";

/* import Login from "./pages/Login"; */ /* */
import "./index.css";
import CityList from "./components/City/CityList";
import City from "./components/City/City";
import CountryList from "./components/Country/CountryList";
import Form from "./components/Form/Form";
import { CitiesProvider } from "../contexts/citiescontext";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<CityList />}></Route>
            <Route path="cities" element={<CityList />}></Route>
            <Route path="cities/:id" element={<City />}></Route>
            <Route path="countries" element={<CountryList />}></Route>
            <Route path="form" element={<Form />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
