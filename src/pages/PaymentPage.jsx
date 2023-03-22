import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContextProvider";
import { useOrder } from "../contexts/OrderContextProvider";
import { useNavigate } from "react-router-dom";
import "../styles/PaymentPage.css";

//mui
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";


const PaymentPage = () => {
  const { getCart, cart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  const [order, setOrder] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone_number: "",
    posts: cart.posts,
    total_price: cart.totalPrice,
  });

  const handleInp = (e) => {
    let obj = {
      ...order,
      [e.target.name]: e.target.value,
    };
    setOrder(obj);
  };

  const [open, setOpen] = useState(false);

  //styles
  const theme2 = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#38153eea",
      },
    },
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <ThemeProvider theme={theme2}>
      <>
      <div className="page">
        <div className="container-payment">
          <h1>Checkout</h1>
          <div className="delivery">
            <hr style={{width: '100%'}}/>
            <img src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-gradient/256/card-dynamic-gradient.png" alt="error:(" />
            <h6>DELIVERY</h6>
            <h6>
              <b>Shipping</b>
            </h6>
            <hr style={{width: '100%'}}/>
          </div>
          <div className="info">
            <h5>Enter details to receive your purchases</h5>

            <div className="user-data">
              <TextField
                label="YOUR FIRST NAME *"
                variant="standard"
                name="firstName"
                onChange={handleInp}
                className="user-inp"
              />
              <TextField
                label="YOUR LAST NAME *"
                variant="standard"
                onChange={handleInp}
                className="user-inp"
                name="lastName"
              />
              <div className="address-inp">
                <TextField
                  label="YOUR DELIVERY ADDRESS"
                  variant="standard"
                  onChange={handleInp}
                  name="address"
                  className="address-inp"
                />
              </div>
              <TextField
                label="YOUR EMAIL ADDRESS *"
                variant="standard"
                onChange={handleInp}
                name="email"
                className="user-inp"
              />
              <TextField
                label="YOUR PHONE *"
                variant="standard"
                onChange={handleInp}
                className="user-inp"
                name="phone_number"
              />
            </div>

            <p id="check-inp">
              <Checkbox {...label} defaultChecked color="default" />
              By signing up, you agree to accept our terms and conditions and
              our privacy and cookie policies. *
            </p>

            <p id="man-inp">*Mandatory fields</p>

            <div className="payments-block">
            <Button
                id="save-btn"
                variant="contained"
                disabled={open}
                onClick={() => {
                  addOrder(order);
                  setOpen(true);
                  setTimeout(() => navigate("/"), 4000);
                }}
              >
                SAVE
              </Button>
            </div>

          </div>
        </div>
        <Collapse in={open}>
          <div
            className="card-success"
            style={{
              borderRadius: "200px",
              background: "#b3a4f5",
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "25%",
              // height: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* <div > */}
            <i className="checkmark">✓</i>
            {/* </div> */}
            <h1 style={{ color: "azure" }}>Success</h1>
            <p>
              We've sent you purchase confirmation!
              <br /> 
              Please check your email,
              <br /> 
              we'll be in touch shortly!
            </p>
          </div>
        </Collapse>
      </div>
      </>
    </ThemeProvider>
  );
};

export default PaymentPage;
