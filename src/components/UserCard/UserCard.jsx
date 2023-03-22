import React, { useEffect } from 'react';
import {useProfile} from '../../contexts/ProfileContextProvider';
import { useUsers } from '../../contexts/UsersContextProvider';

//mui
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Modal from "@mui/material/Modal";

const UserCard = ({item}) => {

    const {user, getCurrentUser} = useProfile();
    const {putRating} = useUsers();

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

  return (
    <div>
        <h2>{item.name}</h2>
        <img src={item.profile_image} alt="error:(" />
        <p>{item.bio}</p>
        <Typography component="legend">{item.ratings.rating__avg}</Typography>
        <Rating name="read-only" value={value} readOnly />
       
        <Button variant="text" onClick={handleOpen}>
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
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Rate from 1 to 5 stars
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={value2}
                        onChange={(event, newValue) => {
                        setValue2(newValue);
                    }}/>
                    <Button
                    onClick={() => putRating(item.id, value2)}>Rate</Button>
                    </Box>
                </Modal>

    </div>
  )
}

export default UserCard