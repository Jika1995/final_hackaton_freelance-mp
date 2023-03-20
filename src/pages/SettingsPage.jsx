import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileContext } from "../contexts/ProfileContextProvider";
import { useContext } from "react";
import { useEffect } from "react";

import { Button, Modal, TextField } from "@mui/material";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const SettingsPage = () => {
  const navigate = useNavigate();
  const {
    user,
    error,
    setError,
    saveEditProfile,
    getCurrentUser,
    resetPassword,
  } = useContext(profileContext);
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    setError(false);
  }, []);

  const handleInp = (e) => {
    if (e.target.name === "profile_image") {
      console.log(e);
      let userObj = {
        ...userData,
        profile_image: e.target.files[0],
      };
      setUserData(userObj);
    } else {
      let userObj = {
        ...userData,
        [e.target.name]: e.target.value,
      };
      setUserData(userObj);
    }
  };

  // MODAL
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data); // отправка данных
    handleClose();
  };

  const [emailReset, setEmailReset] = useState("");
  const [emailInp, setEmailInp] = useState("");
  const [errorInp, setErrorInp] = useState("");

  useEffect(() => {
    setEmailReset();
  }, []);

  useEffect(() => {
    console.log(emailReset);
  }, [emailReset]);

  const handleResetEmail = (e) => {
    setEmailInp(e.target.value);
    const emailData = {
      email: e.target.value,
    };
    setEmailReset(emailData);
    console.log(emailInp);
  };

  const handleClick = () => {
    if (emailInp.trim() === "") {
      setErrorInp("Please enter an email address");
      return;
    }

    setErrorInp("");
    resetPassword(emailReset, navigate);
    setError(false);
  };

  return userData ? (
    <div className="profile-page">
      <div className="header-profile-page">
        <img
          src="https://freelance-webdesign.co.uk/wp-content/uploads/2019/02/software-sale-05.png"
          alt="error:("
        />
      </div>
      <div className="body-profile-content">
        <div className="left-body-profile">
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/profile")}
            id="btn-back-profile"
          >
            <ArrowCircleLeftIcon /> Back
          </Button>
          <div className="avatar">
            <img
              src={
                userData.profile_image
                  ? userData.profile_image
                  : "https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg?w=826&t=st=1678773461~exp=1678774061~hmac=af704675ddfb235ae0bf146fef2ebabda7285fe6d5d02aecbbd13aa0688aaaa9"
              }
              alt="error:("
            />
            <TextField
              className="settings-inputs"
              name="profile_image"
              onChange={handleInp}
              style={{ marginBottom: 10 }}
              type="file"
              accept="image/*"
              value={undefined}
            />
            <div className="profile-reviews">
              {userData.is_buyer ? <h4>Buyer</h4> : <h4>Executor</h4>}
              <h4>Rating</h4>
              <h4>Reviews</h4>
              <h4>Followers</h4>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleOpen();
                  setError(false);
                }}
                id="btn-reset-pass"
              >
                Reset Password <ErrorOutlineIcon />
              </Button>

              {/* MODAL */}
              <Modal open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      position: "absolute",
                      top: "30%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 310,
                      outline: "none",
                      borderRadius: "20px",
                    }}
                    className="window-email"
                  >
                    <h2>Enter email address</h2>
                    {error ? (
                      <h2 style={{ color: "red", fontSize: "1.2rem" }}>
                        ! {error}
                      </h2>
                    ) : null}

                    {errorInp !== "" ? (
                      <h2 style={{ color: "red", fontSize: "1.2rem" }}>
                        ! {errorInp}
                      </h2>
                    ) : null}

                    <input
                      id="inp-email-reset"
                      type="text"
                      name="email-reset"
                      placeholder="email..."
                      onChange={handleResetEmail}
                    />
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClick}
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </Modal>
              {/* END MODAL */}
            </div>
          </div>
        </div>
        <div className="right-body-profile">
          <div className="about-user">
            <h2>Settings</h2>
            <form>
              <TextField
                className="settings-inputs"
                label="Username"
                name="name"
                value={userData.name}
                onChange={handleInp}
              />
              <TextField
                className="settings-inputs"
                label="First Name"
                name="first_name"
                value={userData.first_name}
                onChange={handleInp}
              />
              <TextField
                className="settings-inputs"
                label="Last Name"
                name="last_name"
                value={userData.last_name}
                onChange={handleInp}
              />
              <TextField
                className="settings-inputs"
                label="Email"
                name="email"
                value={userData.email}
                onChange={handleInp}
              />
              <TextField
                className="settings-inputs"
                label="Date Birth"
                name="date_birth"
                value={userData.date_birth}
                onChange={handleInp}
                type="date"
              />
              <TextField
                className="settings-inputs"
                label="City"
                name="city"
                value={userData.city}
                onChange={handleInp}
              />
              <TextField
                className="settings-inputs"
                label="About me"
                name="bio"
                value={userData.bio}
                onChange={handleInp}
              />
              <br />

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  saveEditProfile(userData, navigate);
                  
                }}
                id="btn-save-settings"
              >
                Save changes
              </Button>
            </form>
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

export default SettingsPage;
