import React from "react";
import { Container, Grid, IconButton, Link, Typography } from "@mui/material";
import {
  GitHub,
  Instagram,
  Telegram,
  Twitter,
  YouTube,
  Hub,
} from "@mui/icons-material";
// import  from '@mui/icons-material/Twitter';

import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-body">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src="https://i.pinimg.com/originals/8f/37/68/8f3768d28727aaf04e0abe625caa2234.png"
              alt="error:("
            />
            <div className="footer-logo-desc">
              <Typography
                variant="body2"
                align="center"
                id="footer-logo-desc-count"
              >
                <Hub /> **COUNT** Our Users
              </Typography>
              <Typography variant="body2" align="center">
                &copy; {new Date().getFullYear()} My Awesome Website
              </Typography>
            </div>
          </div>
          <div className="footer-info">
            <div className="footer-block-1">
              <h3>About Us</h3>
            </div>
            <div className="footer-block-2">
              <ul>
                <h3>Community</h3>
                <li>Blog</li>
              </ul>
            </div>
            <div className="footer-block-3">
              <ul>
                <h3>Misc</h3>
                <li>Contact Us</li>
                <li>Join Our Team</li>
              </ul>
            </div>
            <div className="footer-block-4">
              <ul>
                <h3>Our Family</h3>
                <li>Makers</li>
                <li>Udemy</li>
                <li>Habr</li>
                <li>HeadHunter</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-icons">
          <IconButton
            component={Link}
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener"
            aria-label="instagram"
          >
            <Instagram />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener"
            aria-label="twitter"
          >
            <Twitter />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener"
            aria-label="youtube"
          >
            <YouTube />
          </IconButton>
          <IconButton
            component={Link}
            href="https://telegram.org/"
            target="_blank"
            rel="noopener"
            aria-label="telegram"
          >
            <Telegram />
          </IconButton>
          <IconButton
            component={Link}
            href="https://github.com/Jika1995/final_hackaton_freelance-mp"
            target="_blank"
            rel="noopener"
            aria-label="github"
          >
            <GitHub />
          </IconButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

{
  /* <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container spacing={2}>
        
                <IconButton
                  component={Link}
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener"
                  aria-label="instagram"
                >
                  <Instagram />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  component={Link}
                  href="https://telegram.org/"
                  target="_blank"
                  rel="noopener"
                  aria-label="telegram"
                >
                  <Telegram />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  component={Link}
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener"
                  aria-label="github"
                >
                  <GitHub />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body2" align="center">
              &copy; {new Date().getFullYear()} My Awesome Website
            </Typography>
          </Grid>
        </Grid>
      </Container> */
}
