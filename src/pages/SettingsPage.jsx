import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const SettingsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
    } else {
      // submit form data
    }
  };

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
          <div className="about-user">
            <h2>Settings</h2>
          </div>
          <form>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              error={!!errorMessage && !firstName}
              helperText={!!errorMessage && !firstName && errorMessage}
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              error={!!errorMessage && !lastName}
              helperText={!!errorMessage && !lastName && errorMessage}
              style={{ marginBottom: 10 }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={!!errorMessage && !email}
              helperText={!!errorMessage && !email && errorMessage}
              style={{ marginBottom: 10 }}
            />
            <br />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save changes
            </Button>
          </form>
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

export default SettingsPage;
