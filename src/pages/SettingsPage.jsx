import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../contexts/ProfileContextProvider";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const SettingsPage = () => {
  // const [name, setName] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // // const [dateBirth, setDateBirth] = useState("");
  // const [city, setCity] = useState("");
  // const [bio, setBio] = useState("");
  // const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();
  const { user, saveEditProfile } = useProfile();
  const [userData, setUserData] = useState(user);

  const handleInp = (e) => {
    if (e.target.name === "image") {
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

    // for (let key in user) {
    //   if (!user[key]) {
    //     user[key] = "Required this area";
    //     return;
    //   }
    // }
  };

  // CHECK INP
  // const [errorMessage, setErrorMessage] = useState("");

  // const handleSave = () => {
  //   if (!firstame || !lastName || !email) {
  //     let message = "";
  //     if (!firstName) {
  //       firstName = "First name is required";
  //     }
  //     if (!lastName) message += "Last name is required. ";
  //     if (!email) message += "Email is required. ";
  //     setErrorMessage(message);
  //     //       navigate("/profile");
  //   }
  // };

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
              src={
                user.profile_image
                  ? user.profile_image
                  : "https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg?w=826&t=st=1678773461~exp=1678774061~hmac=af704675ddfb235ae0bf146fef2ebabda7285fe6d5d02aecbbd13aa0688aaaa9"
              }
              alt="error:("
            />
            <TextField
              className="settings-inputs"
              name="image"
              // value={user.profile_image}
              onChange={(e) => handleInp(e.target.files[0])}
              // error={!!errorMessage && !email}
              // // helperText={!!errorMessage && !email && errorMessage}
              style={{ marginBottom: 10 }}
              type="file"
              accept="image/*"
              value={undefined}
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
                name="name"
                value={user.name}
                onChange={(e) => handleInp(e.target.value)}
                // // error={!!errorMessage && !firstName}
                // helperText={!!errorMessage && !firstName && errorMessage}
                style={{ marginBottom: 10 }}
              />
              <TextField
                className="settings-inputs"
                label="First Name"
                name="first_name"
                value={user.first_name}
                onChange={(e) => handleInp(e.target.value)}
                // // error={!!errorMessage && !firstName}
                // helperText={!!errorMessage && !firstName && errorMessage}
                style={{ marginBottom: 10 }}
              />
              <TextField
                className="settings-inputs"
                label="Last Name"
                name="last_name"
                value={user.last_name}
                onChange={(e) => handleInp(e.target.value)}
                // // error={!!errorMessage && !lastName}
                // helperText={!!errorMessage && !lastName && errorMessage}
                style={{ marginBottom: 10 }}
              />
              <TextField
                className="settings-inputs"
                label="Email"
                name="email"
                value={user.email}
                onChange={(e) => handleInp(e.target.value)}
                // // error={!!errorMessage && !email}
                // helperText={!!errorMessage && !email && errorMessage}
                style={{ marginBottom: 10 }}
              />
              {/* <TextField
                className="settings-inputs"
                label="Date Birth"
                name="date_birth"
                value={user.date_birth}
                onChange={(e) => handleInp(e.target.value)}
                error={!!errorMessage && !email}
                helperText={!!errorMessage && !email && errorMessage}
                style={{ marginBottom: 10 }}
              /> */}
              <TextField
                className="settings-inputs"
                label="City"
                name="city"
                value={user.city}
                onChange={(e) => handleInp(e.target.value)}
                // error={!!errorMessage && !email}
                // helperText={!!errorMessage && !email && errorMessage}
                style={{ marginBottom: 10 }}
              />
              <TextField
                className="settings-inputs"
                label="About me"
                name="bio"
                value={user.bio}
                onChange={(e) => handleInp(e.target.value)}
                // error={!!errorMessage && !email}
                // helperText={!!errorMessage && !email && errorMessage}
                style={{ marginBottom: 10 }}
              />

              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => saveEditProfile(userData)}
              >
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
