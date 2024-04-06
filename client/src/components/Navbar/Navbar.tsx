// import { Link, Outlet } from 'react-router-dom'
// // import './Navbar.css'
// import { useUser } from '../../UserContext'

// const NavBar = () => {
//   const { login } = useUser()

//   return (
//     <>
//       <ul className="navContainer">
//         <li>
//           <Link className="link" to="/" data-hover="Главная">
//             Главная
//           </Link>
//         </li>

//         {login ? (
//           <>
//             <li>
//               <Link className="link" to="/user" data-hover="Люди">
//                 Люди
//               </Link>
//             </li>

//             <li>
//               <Link className="link" to="/startups" data-hover="Билборд идей">
//                 Билборд идей
//               </Link>
//             </li>

//             <li>
//               <Link className="link" to="/game" data-hover="Чаты">
//                 Чаты
//               </Link>
//             </li>

//             <li className="loginContainer">
//               <div className="logout">
//                 <p>
//                   Добро пожаловать, {login}
//                 </p>
//               </div>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link className="link" to="/registration" data-hover="Регистрация">
//                 Регистрация
//               </Link>
//             </li>
//             <li>
//               <Link className="link" to="/login" data-hover="Войти">
//                 Войти
//               </Link>
//             </li>
//           </>
//         )}
//         <Outlet />
//       </ul>
//     </>
//   )
// }

// export default NavBar

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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useUser } from "../../UserContext";
import LogoutButton from "../Login/LogOut";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

// const pages = [{ name: 'Создать', link: '/' }, { name: 'Билборд идей', link: '/startups' }];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBar() {
  const { login } = useUser();
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
              {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
                  // style={{ width: '100px', height: '50px' }}
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
                  {/* {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))} */}
                  <Link
                    className="link"
                    to="/startups"
                    data-hover="Билборд идей"
                  >
                    Билборд идей
                  </Link>
                </Menu>
              </Box>
              {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
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
                {/* {pages.map((page) => (
              <Button
              key={page.name}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              >
              {page.name}
              </Button>
            ))} */}
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

              <Box sx={{ flexGrow: 0, backgroundColor: "#FFFFFF" }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, backgroundColor: "black" }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="src/assets/avatar.png"
                      sx={{ backgroundColor: 'transparent' }}                    />
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
                  {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
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
              {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              // display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            >
            LOGO
          </Typography> */}

              {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  // display: { xs: 'flex', md: 'none' },
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

              {/* <div>
              <div> */}
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
              {/* </div>
            </div> */}
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
