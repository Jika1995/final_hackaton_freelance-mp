import React, { useEffect, useState } from "react";
import "../styles/ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContextProvider";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Rating from "@mui/material/Rating";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, getCurrentUser } = useProfile();

  // console.log(user.date_birth);
  useEffect(() => {
    getCurrentUser();
  }, []);

  // useEffect(() => {
  //   setValue(user?.ratings?.rating__avg)
  // },[user,])

  // const [value, setValue] = React.useState(user?.ratings?.rating__avg);

  // useEffect(() => {
  //   getCurrentUser(user);
  // }, [user]);

  return user ? (
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
              src={
                user.profile_image
                  ? user.profile_image
                  : "https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg?w=826&t=st=1678773461~exp=1678774061~hmac=af704675ddfb235ae0bf146fef2ebabda7285fe6d5d02aecbbd13aa0688aaaa9"
              }
              alt="error:("
            />
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                getCurrentUser();
                navigate("/settings");
              }}
              id="btn-settings"
            >
              <ManageAccountsIcon /> Settings
            </Button>
            <div className="profile-reviews">
              {user.is_buyer ? <h4>Buyer</h4> : <h4>Executor</h4>}
              <h4>Rating</h4>
              <Rating name="read-only" value={user.ratings?.rating__avg} readOnly />
              <p>{user.ratings?.rating__avg}</p>
              {/* <h4>Reviews</h4>
              <h4>Followers</h4> */}
            </div>
          </div>
        </div>
        <div className="right-body-profile">
          <div className="about-user-info">
            <div className="header-user-info">
              <span className="user-data-info">
                <h1>{user.name}</h1>
              </span>
              <span className="user-data-info">
                <h2>{user.bio}</h2>
              </span>
            </div>
            <div className="user-details">
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="profile-info-text"
              >
                First Name: <br />
                <span className="user-data-info"> {user.first_name}</span>
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="profile-info-text"
              >
                Last Name: <br />
                <span className="user-data-info">{user.last_name}</span>
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="profile-info-text"
              >
                Email: <br />
                <span className="user-data-info">{user.email}</span>
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="profile-info-text"
              >
                Birthday: <br />
                {/* {`${user.date_birth.split("-").slice(2, 3)}.${user.date_birth
                  .split("-")
                  .slice(1, 2)}.${user.date_birth.split("-").slice(0, 1)}`} */}
                <span className="user-data-info">
                  {" "}
                  {user.date_birth
                    ? `${user.date_birth?.split("-")[2]}.${
                        user.date_birth?.split("-")[1]
                      }.${user.date_birth?.split("-")[0]}`
                    : ""}
                </span>
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="profile-info-text"
              >
                City: <br /> <span className="user-data-info">{user.city}</span>
              </Typography>
            </div>
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
  ) : (
    <h3>Sorry, something wrong</h3>
  );
};

export default ProfilePage;
