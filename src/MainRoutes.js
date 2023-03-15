import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import OrdersPage from "./pages/OrdersPage";
import PostsPage from './pages/PostsPage';
import PostDetailsPage from "./pages/PostDetailsPage";
import EditPostPage from './pages/EditPostPage';
import AddPostPage from './pages/AddPostPage';

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/",
      element: <HomePage />,
      id: 1,
    },
    {
      link: "*",
      element: <NotFoundPage />,
      id: 2,
    },
    {
      link: "/register",
      element: <RegistrationPage />,
      id: 3,
    },
    {
      link: "/login",
      element: <LoginPage />,
      id: 4,
    },
    {
      link: "/chat",
      element: <ChatPage />,
      id: 5,
    },
    {
      link: "/profile",
      element: <ProfilePage />,
      id: 6,
    },
    {
      link: "/orders",
      element: <OrdersPage />,
      id: 7,
    },
    {
      link: "/posts",
      element: <PostsPage />,
      id: 8,
    },
    {
      link: "/details/:id",
      element: <PostDetailsPage />,
      id: 9,
    },
    {
      link: "/edit/:id",
      element: <EditPostPage />,
      id: 10,
    },
    {
      link: "/addpost/",
      element: <AddPostPage />,
      id: 11,
    },

  ];
  
  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  );
};

export default MainRoutes;
