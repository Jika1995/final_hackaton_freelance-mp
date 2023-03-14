import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import '../styles/RegistrationPage.css'


const RegistrationPage = () => {
  return <div className="auth-main">
    <Container className="auth-container">
      <Box className='left-block'>
        <Box className='welcome-block'>
          <Box className='welcome-info'>
            <img src="" alt="error" />
            <Typography variant="h4">
              Welcome to Free Hub!
            </Typography>
            <p>
              Free Hub is the leading marketplace of freelance services. Made for freelancers all over the world building the future of digital world. 
            </p>
          </Box>
        </Box>
        <Box className='auth-block'>
          <h1>this is auth block</h1>
        </Box>
       
      </Box>
      <Box className='right-block'>
        <img src="" alt="error" />
      </Box>
    </Container>
  </div>;
};

export default RegistrationPage;
