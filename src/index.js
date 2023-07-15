import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RestaurantMenu from "./Components/RestaurantMenu";
import Cart from "./Components/Cart";
import About from "./Components/About";
import store from "./Components/Store";
import { Provider } from "react-redux";
import Contact from "./Components/Contact";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
