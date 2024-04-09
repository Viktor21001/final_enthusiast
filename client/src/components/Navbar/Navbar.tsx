import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../UserContext";
import LogoutButton from "../Login/LogOut";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { RootState } from "@reduxjs/toolkit/query";
import { PeopleState } from "../../redux/peopleSlice";


function NavBar() {
  const { login } = useUser();

  const peopleState = useSelector<RootState, PeopleState>(
    (state) => state.people
  );
   
  console.log(peopleState, 'peopleState');
  
    const member = peopleState.people.find((el) => el.login === login);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ backgroundColor: "#FFFFFF" }} position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: "#FFFFFF" }}>
        <Toolbar disableGutters sx={{ backgroundColor: "#FFFFFF" }}>
          {login ? (
            <>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <img
                  src="/1.png"
                  alt="Logo"
                  style={{ backgroundColor: "#FFFFFF", width: "200px" }}
                />
              </Typography>
              <div style={{ display: "flex", alignItems: "center", backgroundColor: "#FFFFFF"}}>
                  <SearchIcon sx={{ backgroundColor: "#FFFFFF" , color:"gray"}} />
                  <InputBase
                    placeholder="Поиск по Enthisiast"
                    inputProps={{ "aria-label": "search" }}
                    sx={{ ml: 1 , backgroundColor: "#EBEFFA" , 
                    borderRadius: '10px',  
                    '&::placeholder': { // Применяем стили к тексту placeholder
                      textAlign: 'right', // Выравнивание текста по правому краю
                      color: 'gray', // Цвет текста placeholder
                    }, }}
                  />
                </div>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Link
                    className="link"
                    to="/startups"
                    data-hover="Билборд идей"
                  >
                    Билборд идей
                  </Link>
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <img
                  style={{ width: "100px", height: "50px" }}
                  src="/1.png"
                  alt="Logo"
                />
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  backgroundColor: "#FFFFFF",
                }}
              >
                <CircleNotificationsOutlinedIcon
                  sx={{ backgroundColor: "#FFFFFF" }}
                />
                <Link
                  style={{
                    margin: "0 10px",
                    color: "black",
                    display: "block",
                    backgroundColor: "#FFFFFF",
                  }}
                  className="link"
                  to="/newidea"
                  data-hover="Создать"
                >
                  Создать
                </Link>
              </Box>
              <Link
                  style={{
                    margin: "0 10px",
                    color: "black",
                    display: "block",
                    backgroundColor: "#FFFFFF",
                  }}
                  className="link"
                  to="/newstartup"
                  data-hover="Создать"
                >
                  Создать стартап
                </Link>
              <Box sx={{ flexGrow: 0, backgroundColor: "#FFFFFF" }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, backgroundColor: "black" }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      
                       src={ `${import.meta.env.VITE_IMG}/${member?.avatar}` || "src/assets/avatar.png"}
                    />

                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link
                    style={{
                      margin: "0 10px",
                      color: "black",
                      display: "block",
                    }}
                    className="link"
                    to="/lk"
                    data-hover="Профиль"
                    onClick={handleCloseUserMenu}
                  >
                    Профиль
                  </Link>
                  <LogoutButton />
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  backgroundColor: "#FFFF",
                }}
              >
                <img
                  style={{
                    width: "200px",
                    height: "50px",
                    backgroundColor: "#FFFF",
                    float: "left",
                  }}
                  src="/1.png"
                  alt="Logo"
                />
              </Typography>
              <Link
                style={{
                  margin: "0 10px",
                  display: "block",
                  backgroundColor: "#FFFF",
                  color: "black",
                }}
                className="link"
                to="/login"
                data-hover="Войти"
              >
                Войти
              </Link>
              <Link
                style={{
                  margin: "0 10px",
                  backgroundColor: "#FFFF",
                  color: "black",
                  display: "block",
                }}
                className="link"
                to="/registration"
                data-hover="Регистрация"
              >
                Регистрация
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
