import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileContext } from "../contexts/ProfileContextProvider";
import { useContext } from "react";
import { useEffect } from "react";

import { Button, Modal, TextField } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { user, error, setError, setNewPassword, checkReset, setCheckReset } =
    useContext(profileContext);
  const [userData, setUserData] = useState(user);

  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [code, setConf] = useState("");

  const [passResetInput, setPassResetInput] = useState("");

  useEffect(() => {
    setError(false);
  }, []);

  useEffect(() => {
    setPassResetInput();
  }, []);

  useEffect(() => {
    console.log(passResetInput);
  }, [passResetInput]);

  const handleResetPass = (e) => {
    const newData = {
      ...passResetInput,
      [e.target.name]: e.target.value,
    };

    console.log(newData);

    setPassResetInput(newData);
  };

  // MODAL
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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
            name="password_confirm"
            placeholder="new password confirm"
            onChange={handleResetPass}
          />
          <input
            id="inp-email-reset"
            type="text"
            name="code"
            placeholder="verification code"
            onChange={handleResetPass}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setNewPassword(passResetInput, handleOpen, navigate);
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

      {/* MODAL */}
      <Modal open={open}>
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
          className="modal-success-reset"
        >
          <h2>PASSWORD СHANGED SUCCESSFULLY</h2>
          <TaskAltIcon />
          <img
            src="https://www.freeiconspng.com/thumbs/forgot-password-icon/forgot-password-icon-17.png"
            // https://www.freeiconspng.com/thumbs/forgot-password-icon/forgot-password-icon-17.png
            alt="error:("
            height="100px"
          />
        </div>
      </Modal>
      {/* END MODAL */}
    </div>
  );
};

export default ResetPasswordPage;
