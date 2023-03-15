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
              {/* <Typography
                variant="body2"
                align="center"
                id="footer-logo-desc-count"
              >
                <Hub /> **COUNT** Our Users
              </Typography> */}
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
                <li>
                  <a href="https://makers.kg/" target="_blank">
                    Makers
                  </a>
                </li>
                <li>
                  <a href="https://www.udemy.com/ru/" target="_blank">
                    Udemy
                  </a>
                </li>
                <li>
                  <a href="https://www.udemy.com/ru/" target="_blank">
                    Habr
                  </a>
                </li>
                <li>
                  <a href="https://bishkek.headhunter.kg/" target="_blank">
                    HeadHunter
                  </a>
                </li>
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
            className="icons-btns"
          >
            <Instagram className="icons" />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener"
            aria-label="twitter"
            className="icons-btns"
          >
            <Twitter className="icons" />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener"
            aria-label="youtube"
            className="icons-btns"
          >
            <YouTube className="icons" />
          </IconButton>
          <IconButton
            component={Link}
            href="https://telegram.org/"
            target="_blank"
            rel="noopener"
            aria-label="telegram"
            className="icons-btns"
          >
            <Telegram className="icons" />
          </IconButton>
          <IconButton
            component={Link}
            href="https://github.com/Jika1995/final_hackaton_freelance-mp"
            target="_blank"
            rel="noopener"
            aria-label="github"
            className="icons-btns"
          >
            <GitHub className="icons" />
          </IconButton>
        </div>
      </div>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} My Final Website
      </Typography>
    </footer>
  );
};

export default Footer;
