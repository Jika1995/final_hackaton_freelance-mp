import React from "react";
import "../styles/ProfilePage.css";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

const ProfilePage = () => {
  const navigate = useNavigate();

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
              <h4>Rating</h4>
              <h4>Reviews</h4>
              <h4>Followers</h4>
            </div>
          </div>
        </div>
        <div className="right-body-profile">
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate("/settings")}
          >
            Settings
          </Button>
          <div className="about-user">
            <h2>Username</h2>
            <p>Some text about users</p>
          </div>
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
