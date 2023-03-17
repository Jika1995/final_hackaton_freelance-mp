import React, { useEffect } from "react";
import "../styles/ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContextProvider";
import { useContext } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, getCurrentUser } = useProfile();

  console.log(user.date_birth);
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="profile-page">
      <div className="header-profile-page">
        <img
          src="https://freelance-webdesign.co.uk/wp-content/uploads/2019/02/software-sale-05.png"
          alt=""
        />
      </div>
      <div className="body-profile-content">
        <div className="left-body-profile">
          <div className="avatar">
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg?w=826&t=st=1678773461~exp=1678774061~hmac=af704675ddfb235ae0bf146fef2ebabda7285fe6d5d02aecbbd13aa0688aaaa9"
              alt=""
            />
            <div className="profile-reviews">
              {user.is_buyer ? <h4>Buyer</h4> : <h4>Executant</h4>}
              <h4>Rating</h4>
              <h4>Reviews</h4>
              <h4>Followers</h4>
            </div>
          </div>
        </div>
        <div className="right-body-profile">
          <div className="about-user">
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="profile-info-text"
            >
              Username: {user.name}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="profile-info-text"
            >
              First Name: {user.first_name}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="profile-info-text"
            >
              Last Name: {user.last_name}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="profile-info-text"
            >
              Email: {user.email}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="profile-info-text"
            >
              Birthday: {user.date_birth}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="profile-info-text"
            >
              City: {user.city}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="profile-info-text"
            >
              About Me: {user.bio}{" "}
            </Typography>
          </div>
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate("/settings")}
          >
            Settings
          </Button>
          <Button variant="contained" color="error" onClick={getCurrentUser}>
            GET
          </Button>
        </div>
      </div>
      <div className="promo-profile">
        <video loop autoPlay muted>
          <source
            src="https://stoichain.com/ayzd-bg-compressed.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default ProfilePage;
