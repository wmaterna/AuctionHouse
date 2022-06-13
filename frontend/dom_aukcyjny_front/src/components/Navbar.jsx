import * as React from "react";
import {useState, useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import {setUserLoggedOut} from "../screens/requests/userLogginStatus";
import {useHistory} from "react-router-dom";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [destination, setDestination] = useState("");
  const history = useHistory();
  const userLogged = useState(props.userLogged)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
      history.push("/");
    setUserLoggedOut();
  };

  const handleLogIn = () => {
    history.push("/log-in");
  };

  const handleRegister = () => {
    history.push("/register");
  };

  const handlepush = () => {
      history.push("/my-bets");
  }
  const handlepushToGallery = () => {
    history.push("/gallery");
  }



  return (
    <AppBar position="static" style={{backgroundColor: "#5CAAC9"}}>
      <Container maxWidth="xl">
      {props.userLogged ? 
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            Art gallery
          </Typography>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <div>
            <Button style={{color: "white", fontWeight: "600", padding: "25px"}} onClick={handlepush}>
              My bets
            </Button>
            <Button style={{color: "white", fontWeight: "600", padding: "25px"}} onClick={handlepushToGallery}>
              Gallery
            </Button>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </div>
          </Box>
        </Toolbar>
        : 
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            Art gallery
          </Typography>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <div>
              <Button style={{color: "white", fontWeight: "600", padding: "25px"}} onClick={handleLogIn} sx={{ p: 0 }}>
                Log in
              </Button>
              <Button style={{color: "white", fontWeight: "600", padding: "25px"}} onClick={handleRegister} sx={{ p: 0 }}>
                Regsiter
              </Button>
            </div>
          </Box>
        </Toolbar>
      }
      </Container>
    </AppBar>
  );
};
export default Navbar;