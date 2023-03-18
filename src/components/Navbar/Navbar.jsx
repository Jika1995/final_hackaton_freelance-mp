import React, { useState, useEffect, useContext } from "react";
import "../../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/AuthContextProvider";
import {useCart} from '../../contexts/CartContextProvider';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const pages = [
  {
    type: "Chat",
    path: "/chat",
  },
  {
    type: "Market",
    path: "/posts",
  },
  {
    type: "Add Post",
    path: "/addpost",
  },
];

const settingsNoAuth = [
  {
    type: "Register",
    path: "/register",
  },
  {
    type: "Login",
    path: "/login",
  },
];

const settingsAuth = [
  {
    type: "Profile",
    path: "/profile",
  },
  {
    type: "Logout",
    path: "/",
  },
];

function Navbar() {
  // MUI
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // custom
  const navigate = useNavigate();
  const { currentUser, handleLogout, checkAuth } = useContext(authContext);
  const {cartLength} = useCart()

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  React.useEffect(() => {
    if (localStorage.getItem("tokens")) {
      checkAuth();
    }
  }, []);

  // for animate nav
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    //     <nav className={`navbar ${visible ? "navbar--visible" : "navbar--hidden"}`}>
    //       {/* ваше содержимое навбара */}
    //     </nav>
    <AppBar
      className={`navbar ${visible ? "navbar--visible" : "navbar--hidden"}`}
    >
      <div className="navbar__logo"></div>
      <Container maxWidth="ml">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
            id="label-name"
          >
            freeHub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.type} onClick={handleCloseNavMenu}>
                  <Typography
                    textalign="center"
                    onClick={() => navigate(page.path)}
                    id="box-nav-btns"
                  >
                    {page.type}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile ???*/}
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          {/* <DESKTOP></DESKTOP> */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className=""
          >
            {pages.map((page) => (
              <Button
                key={page.type}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => navigate(page.path)}
                className="icon-btns-nav"
              >
                {page.type}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} className="icon-box">
            <IconButton
              size="medium"
              color="inherit"
              onClick={() => navigate("/favorites")}
              className="icon-btns-nav"
            >
              <Badge
                color="error"
                //   badgeContent={favLength}
                className="nav-badge"
              >
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              color="inherit"
              onClick={() => navigate("/cart")}
              className="icon-btns-nav"
            >
              <Badge
                  badgeContent={cartLength}
                color="error"
                className="nav-badge"
              >
                <LocalMallIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Account">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: "12px" }}
                className="icon-btns-nav"
              >
                {/* <Avatar alt={user} src="..." /> */}
                <Avatar src="..." />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUser
                ? settingsAuth.map((setting) =>
                    setting.type === "Logout" ? (
                      <MenuItem
                        key={setting.type}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography
                          textalign="center"
                          onClick={() => handleLogout(navigate)}
                          id="logout-btn"
                        >
                          Logout
                        </Typography>
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key={setting.type}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography
                          textalign="center"
                          onClick={() => navigate(setting.path)}
                        >
                          {setting.type}
                        </Typography>
                      </MenuItem>
                    )
                  )
                : settingsNoAuth.map((setting) => (
                    <MenuItem key={setting.type} onClick={handleCloseUserMenu}>
                      <Typography
                        textalign="center"
                        onClick={() => navigate(setting.path)}
                      >
                        {setting.type}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
