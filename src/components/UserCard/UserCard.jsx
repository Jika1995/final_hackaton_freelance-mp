import React, { useEffect } from "react";
import { useProfile } from "../../contexts/ProfileContextProvider";
import { useUsers } from "../../contexts/UsersContextProvider";
import "../../styles/UserCard.css";

//mui
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const UserCard = ({ item }) => {
  const { user, getCurrentUser } = useProfile();
  const { putRating, getBuyers, getExecutants, buyers, executants } =
    useUsers();

  //mui
  const [value, setValue] = React.useState(item.ratings?.rating__avg);
  const [value2, setValue2] = React.useState(0);

  //mui modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    console.log('changed');
    setValue(item.ratings?.rating__avg)
  }, [item])

  // useEffect(() => {
  //   getBuyers();
  // }, []);

  useEffect(() => {
    getExecutants();
    console.log('changed');
  }, [item]);

  return (
    <Card className="card-user" key={item.id}>
      <CardMedia
        component="img"
        image={
          item.profile_image
            ? item.profile_image
            : "https://freesvg.org/img/v.png"
        }
        alt="error:("
        className="card-user-image"
      />
      <div className="content-block">
        <CardHeader
          className="card-title"
          title={item.name}
          style={{ fontWeight: "bold !important" }}
        />
        <CardContent className="card-text">
          <Typography variant="body2" color="text.secondary">
            <span id="user-bio-text">{item.bio}</span>
          </Typography>
        </CardContent>
        <CardActions className="btns-block-user">
          <Typography component="legend">{item.ratings.rating__avg}</Typography>
          <Rating name="read-only" value={value} readOnly />
          <Button variant="text" onClick={handleOpen} id="btn-user-card">
            Do you want to rate this user?
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              style={{
                width: "40%",
                margin: "auto",
                borderRadius: "10px",
              }}
              className="modal-user-card"
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Rate from 1 to 5 stars
              </Typography>
              <br />
              <Rating
                name="simple-controlled"
                value={value2}
                onChange={(event, newValue) => {
                  setValue2(newValue);
                }}
              />
              <Button
                onClick={() => {
                  putRating(item.id, value2);
                  setValue2(0);
                  handleClose();
                }}
                className="modal-user-card-btn"
              >
                Rate
              </Button>
            </Box>
          </Modal>
        </CardActions>
      </div>
    </Card>
  );
};

export default UserCard;
