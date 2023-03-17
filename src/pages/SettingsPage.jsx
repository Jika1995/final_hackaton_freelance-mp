import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContextProvider";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const SettingsPage = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [dateBirth, setDateBirth] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
    if (!firstName || !lastName || !email) {
      let message = "";
      if (!firstName) {
        firstName = "First name is required";
      }
      if (!lastName) message += "Last name is required. ";
      if (!email) message += "Email is required. ";
      setErrorMessage(message);
      //       navigate("/profile");
    }
  };

  const navigate = useNavigate();
  const { user } = useProfile();

  const [userData, setUserData] = useState(user);

  const handleInp = (e) => {
    if (e.target.name === "profileImage") {
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

  return user ? (
    <div className="profile-page">
      <div className="header-profile-page">
        <img
          src="https://freelance-webdesign.co.uk/wp-content/uploads/2019/02/software-sale-05.png"
          alt="error:("
        />
      </div>
      <div className="body-profile-content">
        <div className="left-body-profile">
          <div className="avatar">
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg?w=826&t=st=1678773461~exp=1678774061~hmac=af704675ddfb235ae0bf146fef2ebabda7285fe6d5d02aecbbd13aa0688aaaa9"
              alt="error:("
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
            <h2>Settings</h2>
            <form>
              <TextField
                className="settings-inputs"
                label="Username"
                value={user.name}
                onChange={(e) => {
                  setName(e.target.value);
                  handleInp(e);
                }}
                error={!!errorMessage && !firstName}
                helperText={!!errorMessage && !firstName && errorMessage}
                style={{ marginBottom: 10 }}
              />
              <TextField
                className="settings-inputs"
                label="First Name"
                value={user.first_name}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  handleInp(e);
                }}
                error={!!errorMessage && !firstName}
                helperText={!!errorMessage && !firstName && errorMessage}
                style={{ marginBottom: 10 }}
              />
              <TextField
                className="settings-inputs"
                label="Last Name"
                value={user.last_name}
                onChange={(e) => {
                  setLastName(e.target.value);
                  handleInp(e);
                }}
                error={!!errorMessage && !lastName}
                helperText={!!errorMessage && !lastName && errorMessage}
                style={{ marginBottom: 10 }}
              />
              <TextField
                className="settings-inputs"
                label="Email"
                value={user.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleInp(e);
                }}
                error={!!errorMessage && !email}
                helperText={!!errorMessage && !email && errorMessage}
                style={{ marginBottom: 10 }}
              />
              {/* <TextField
              className="settings-inputs"
              label="Date Birth"
              value={user.date_birth}
              onChange={(e) => {
                setDateBirth(e.target.value);
                handleInp(e);
              }}
              error={!!errorMessage && !email}
              helperText={!!errorMessage && !email && errorMessage}
              style={{ marginBottom: 10 }}
            /> */}
              <TextField
                className="settings-inputs"
                label="City"
                value={user.city}
                onChange={(e) => {
                  setCity(e.target.value);
                  handleInp(e);
                }}
                error={!!errorMessage && !email}
                helperText={!!errorMessage && !email && errorMessage}
                style={{ marginBottom: 10 }}
              />
              <TextField
                className="settings-inputs"
                label="About me"
                value={user.bio}
                onChange={(e) => {
                  setBio(e.target.value);
                  handleInp(e);
                }}
                error={!!errorMessage && !email}
                helperText={!!errorMessage && !email && errorMessage}
                style={{ marginBottom: 10 }}
              />
              <TextField
                className="settings-inputs"
                value={profileImage}
                onChange={(e) => {
                  setProfileImage(e.target.value);
                  handleInp(e);
                }}
                error={!!errorMessage && !email}
                helperText={!!errorMessage && !email && errorMessage}
                style={{ marginBottom: 10 }}
                type="file"
              />
              <br />
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save changes
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/profile")}
              >
                Back
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
