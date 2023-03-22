import React, { useContext } from "react";

import { Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import PortraitIcon from '@mui/icons-material/Portrait';

import { useCart } from "../../contexts/CartContextProvider";
import { useNavigate } from "react-router-dom";
import "../../styles/Cart.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useProfile } from "../../contexts/ProfileContextProvider";
import { authContext } from "../../contexts/AuthContextProvider";

export default function Cart() {
  const { getCart, cart, changePostCount, deletePostFromCart, cartLength } =
    useCart();
  const { currentUser, handleLogout, checkAuth } = useContext(authContext);

  const { user, getCurrentUser } = useProfile();

  React.useEffect(() => {
    getCart();
  }, []);

  React.useEffect(() => {
    // if (!cart.products) {
    //   getCart()
    // }
  }, [cart.posts]);

  function cartCleaner() {
    localStorage.removeItem("cart");
    getCart();
  }

  React.useEffect(() => {
    getCurrentUser()
  },[])

  const [promo, setPromo] = React.useState("");
  const [sale, setSale] = React.useState(0);
  const [percents, setPercents] = React.useState(0);

  const [totalPriceValue, setTotalPriceValue] = React.useState("");
  const myRef = React.useRef("");

  function handleChange(e) {
    let text = myRef.current.textContent;
    text = text.split("").splice(1);
    text = text.join("");
    console.log(+text);

    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.totalPrice = +text;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const handleInp = (e) => {
    setPromo(e.target.value);
    let percents = parseInt(e.target.value.match(/\d+/));
    if (percents) {
      setPercents(percents);
    } else {
      setPercents(0);
      return;
    }
  };

  const useSale = () => {
    if (!cart) {
      alert("You have no items in cart");
      return;
    }

    if (typeof sale !== "number") {
      setSale(0);
      return;
    }
    if (typeof sale === "number") {
      setSale(cart.totalPrice * (percents / 100));
    }
  };

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#bc9366",
      },
    },
  });

  return (
    <>
      <div className="cart-page">
        <div className="mybox h-100">
          <div className=" main-body d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="main-card">
                <div className="card-body main-cardbody d-flex m-auto">
                  <div className="row w-100 ">
                    <div className="card-body">
                      <h5 className="mb-3 continue-title">
                        <a
                          onClick={() => navigate("/posts")}
                          className="text-body"
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fas me-2" />
                          <ArrowBackIcon /> Continue shopping
                        </a>
                      </h5>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div style={{ width: "100%" }} key={Date.now()}>
                          <p className="m-auto">Shopping cart</p>
                          <p className="m-auto">
                            You have {cartLength} items in your cart
                          </p>
                        </div>
                        {/* <div>
                          <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!" className="text-body">price <i className="fas fa-angle-down mt-1" /></a></p>
                        </div> */}
                      </div>
                      <div className="info-block">
                        <div className="cards-list">
                          {cart?.posts.map((elem) => (
                            <div className="card mb-3" key={elem.item.id} style={{marginBottom: '15px'}}>
                              <div className="card-body-prod">
                                <div className="box-img">
                                  <img
                                    src={elem.item.image}
                                    className="product-img"
                                    alt="Shopping item"
                                  />
                                </div>

                                <div className="info-text">
                                  <h5>{elem.item.title}</h5>
                                </div>

                                <div className="price-block">
                                  {/* <TextField
                                    style={{ width: "60px", height: "40px" }}
                                    type="number"
                                    value={elem.count}
                                    onChange={(e) =>
                                      changePostCount(
                                        e.target.value,
                                        elem.item.id
                                      )
                                    }
                                  /> */}

                                  <h5 className="mb-0">{elem.item.price}$</h5>

                                  <h5 className="mb-0">
                                    Sub Price: {elem.subPrice}$
                                  </h5>

                                  <a
                                    href="#!"
                                    style={{ color: "#bf4545" }}
                                    onClick={() =>
                                      deletePostFromCart(elem.item.id)
                                    }
                                  >
                                    <img src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-gradient/256/trash-can-dynamic-gradient.png" alt="error:(" width='40px'/>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="details__block">
                          <div className="card text-white rounded-3 card-details">
                            <div className="card-body-details">
                              <div className="d-flex justify-content-between align-items-center mb-4 card-details-header">
                                <h5 className="card-details-title">
                                  Card details
                                </h5>
                                <img
                                  src={user?.profile_image ? user.profile_image : 'https://icon-library.com/images/portrait-icon/portrait-icon-18.jpg'}
                                  className="img-fluid rounded-3"
                                  style={{ width: "60px", margin: "10px" }}
                                  alt="Avatar"
                                />

                                <p
                                  className="mb-2"
                                  style={{
                                    color: "aliceblue",
                                    fontSize: "20px",
                                  }}
                                >
                                  Card type
                                </p>
                                <div className="payment-cards">
                                  <a href="#!" type="submit">
                                    <img
                                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/83141/visa-card.svg"
                                      alt="error :("
                                    />
                                  </a>
                                  <a href="#!" type="submit">
                                    <img
                                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/83141/amex-card.svg"
                                      alt="error :("
                                    />
                                  </a>
                                  <a href="#!" type="submit">
                                    <img
                                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/83141/mastercard.svg"
                                      alt="error :("
                                    />
                                  </a>
                                </div>
                              </div>

                              <ThemeProvider theme={theme}>
                                <form className="mt-4">
                                  <div className="form-outline form-white mb-4">
                                    <TextField
                                      label="Cardholder's Name"
                                      variant="outlined"
                                      fullWidth
                                    />
                                  </div>
                                  <div className="form-outline form-white mb-4">
                                    <TextField
                                      label="Card Number"
                                      variant="outlined"
                                      fullWidth
                                    />
                                  </div>
                                  <div className="row mb-4">
                                    <div className="col-md-6">
                                      <div className="form-outline form-white">
                                        <TextField
                                          label="Expiration"
                                          variant="outlined"
                                          fullWidth
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-outline form-white">
                                        <TextField
                                          label="CVV"
                                          variant="outlined"
                                          type="password"
                                          fullWidth
                                        />
                                      </div>
                                    </div>
                                    <div className="form-outline form-white mb-4 mt-4 box-promo">
                                      <TextField
                                        label="Promocode"
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleInp}
                                      />
                                      <Button
                                        variant="contained"
                                        id="promo-btn"
                                        onClick={useSale}
                                      >
                                        Use Promo
                                      </Button>
                                    </div>
                                  </div>
                                </form>
                              </ThemeProvider>
                              <hr className="my-4" />
                              <div>
                                <div className="d-flex justify-content-between">
                                  <p className="mb-2 prices-par">Subtotal</p>
                                  <p className="mb-2 prices-par">
                                    ${cart?.totalPrice}
                                  </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p className="mb-2 prices-par">Sale</p>
                                  <p className="mb-2 prices-par">${sale}</p>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                  <p className="mb-2 prices-par">
                                    Total (Incl. taxes)
                                  </p>
                                  <p className="mb-2 prices-par" ref={myRef}>
                                    ${cart?.totalPrice - sale}
                                  </p>
                                </div>
                              </div>
                              <div className="box-checkout">
                                <Button
                                  variant="contained"
                                  id="checkout-btn"
                                  onClick={() => {
                                    // cartCleaner();
                                    navigate("/payment");
                                    handleChange();
                                  }}
                                >
                                  Checkout
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
