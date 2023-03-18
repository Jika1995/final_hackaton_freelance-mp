import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileContext } from "../contexts/ProfileContextProvider";
import { useContext } from "react";
import { useEffect } from "react";

import { Button, Modal, TextField } from "@mui/material";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { user, error, setError, setNewPassword } = useContext(profileContext);
  const [userData, setUserData] = useState(user);

  const [passReset, setPassReset] = useState("");

  useEffect(() => {
    setError(false);
  }, []);

  useEffect(() => {
    setPassReset();
  }, []);

  useEffect(() => {
    console.log(passReset);
  }, [passReset]);

  const handleResetPass = (e) => {
    const newData = {
      password: e.target.value,
      password_confirm: e.target.value,
      code: e.target.value,
    };

    setPassReset(newData);
  };

  return (
    <div className="profile-page">
      <div className="header-profile-page">
        <img
          src="https://freelance-webdesign.co.uk/wp-content/uploads/2019/02/software-sale-05.png"
          alt="error:("
        />
      </div>

      <form>
        <div className="window-reset-page">
          <h2>Enter new data</h2>
          {error ? (
            <h2 style={{ color: "red", fontSize: "1.2rem" }}>! {error}</h2>
          ) : null}
          <input
            id="inp-email-reset"
            type="text"
            name="password"
            placeholder="new password"
            onChange={handleResetPass}
          />
          <input
            id="inp-email-reset"
            type="text"
            name="password-conf"
            placeholder="new password confirm"
            onChange={handleResetPass}
          />
          <input
            id="inp-email-reset"
            type="text"
            name="verif-code"
            placeholder="verification code"
            onChange={handleResetPass}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setNewPassword(passReset);
              navigate("/profile");
            }}
          >
            Apply
          </Button>
        </div>
      </form>

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

export default ResetPasswordPage;
