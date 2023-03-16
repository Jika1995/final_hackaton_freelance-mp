import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MainRoutes from "./MainRoutes";
import AuthContextProvider from "./contexts/AuthContextProvider";
import PostContextProvider from "./contexts/PostContextProvider";
import CartContextProvider from "./contexts/CartContextProvider";

const App = () => {
  return (
    <CartContextProvider>
    <PostContextProvider>
    <AuthContextProvider>
      <Navbar />
      <MainRoutes />
      <Footer />
    </AuthContextProvider>
    </PostContextProvider>
    </CartContextProvider>
  );
};

export default App;
