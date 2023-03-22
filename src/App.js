import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import MainRoutes from "./MainRoutes";
import AuthContextProvider from "./contexts/AuthContextProvider";
import PostContextProvider from "./contexts/PostContextProvider";
import CartContextProvider from "./contexts/CartContextProvider";
import ProfileContextProvider from "./contexts/ProfileContextProvider";
import CommentContextProvider from "./contexts/CommentContextProvider";
import FavoritesContextProvider from "./contexts/FavoritesContextProvider";
import UsersContextProvider from "./contexts/UsersContextProvider";
import OrderContextProvider from "./contexts/OrderContextProvider";

const App = () => {
  return (
    <OrderContextProvider>
    <UsersContextProvider>
      <FavoritesContextProvider>
        <PostContextProvider>
          <CommentContextProvider>
            <ProfileContextProvider>
              <AuthContextProvider>
                <CartContextProvider>
                  <Navbar />
                  <MainRoutes />
                  <Footer />
                </CartContextProvider>
              </AuthContextProvider>
            </ProfileContextProvider>
          </CommentContextProvider>
        </PostContextProvider>
      </FavoritesContextProvider>
    </UsersContextProvider>
    </OrderContextProvider>
  );
};

export default App;
