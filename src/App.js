import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MainRoutes from "./MainRoutes";
import AuthContextProvider from "./contexts/AuthContextProvider";
import PostContextProvider from "./contexts/PostContextProvider";
import ProfileContextProvider from "./contexts/ProfileContextProvider";

const App = () => {
  return (
    <ProfileContextProvider>
      <PostContextProvider>
        <AuthContextProvider>
          <Navbar />
          <MainRoutes />
          <Footer />
        </AuthContextProvider>
      </PostContextProvider>
    </ProfileContextProvider>
  );
};

export default App;
