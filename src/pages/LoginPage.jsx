import React, {useState, useEffect, useContext} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import '../styles/RegistrationPage.css';

import { useNavigate } from 'react-router-dom';
import { authContext } from "../contexts/AuthContextProvider";

const LoginPage = () => {

  const navigate = useNavigate();
  const {handleLogin, error, setError} = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleAuth () {
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    handleLogin(formData, email, navigate);

  };

    //для всех будем использовать состояние ошибки, значит мы должны очищать его
    useEffect(() => {
      setError(false);
    }, []);

    return <div className="auth-main">
    <Container className="auth-container">
      <Box className='left-block'>
        <Box className='welcome-block'>
          <Box className='welcome-info'>
            <img src='https://i.ibb.co/CWxG1Th/Rectangle.png' width='150px' id="zamok"/>
            <Typography variant="h4" style={{fontFamily: 'Mulish', fontWeight: '700', fontSize: '50px'}} id='welcome-title'> 
              WELCOME TO FREE HUB!
            </Typography>
            <p>
              Free Hub is the leading marketplace of freelance services. Made for freelancers all over the world building the future of digital world. 
            </p>
          </Box>
        </Box>
        <Box className='auth-block'>
          <Box className='reg-block'>
          <div className="sign-block">
            <Typography variant="h2"  color='rgba(0, 0, 0, 0.87)' style={{cursor: 'pointer', fontFamily: 'Mulish', fontWeight: '700', fontSize: '50px'}} onClick={() => navigate('/login')} id="signup-title">Sign in</Typography>
            <Typography variant="h2"  color='grey' style={{cursor: 'pointer', fontFamily: 'Mulish', fontWeight: '700', fontSize: '50px'}} onClick={() => navigate('/register')} id='sign-nav'>Sign up</Typography>
          </div>
          <div className="inputs-block">
            <TextField variant='standard' label='Email*' placeholder='Enter your email' color='secondary' fullWidth sx={{mb: '10px'}} className='reg-inp' onChange={e => setEmail(e.target.value)}>
              
            </TextField>
            <TextField variant='standard' label='Password*' placeholder='Enter your password' color='secondary'  fullWidth sx={{mb: '10px'}} className='reg-inp' onChange={e => setPassword(e.target.value)}>
              
            </TextField>
          </div>
          <Button variant="contained" className="reg-btn" fullWidth onClick={handleAuth}>
            Sign in
          </Button>
          </Box>
        </Box>
       
      </Box>
      <Box className='right-block'>
        {error ? <h2>{error}</h2> : null} 
        <img src="https://i.ibb.co/xH1gDVL/kid-30637-unscreen.gif" alt="error" width='800px' height='500px' id='auth-img'/>
      </Box>
    </Container>
  </div>;
};

export default LoginPage;
