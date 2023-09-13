import { Button, Stack } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import React, { useContext, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, IconButton as RsIconButton } from "rsuite";
import { ThemeContext } from "../../context/ThemeProvider";
import { logout, selectCurrentUser } from "../../store/authSlice";
import CreatePatientModal from "../modals/CreatePatientModal";

const UserMenu = ({ style }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentUser = useSelector(selectCurrentUser);

  const renderButton = (props, ref) => {
    return (
      <RsIconButton
        appearance="default"
        {...props}
        ref={ref}
        placement="right"
        icon={<ArrowDownIcon style={style} />}
        style={style}>
        {currentUser.firstName}
      </RsIconButton>
    );
  };
  return (
    <>
      <CreatePatientModal open={open} handleClose={handleClose} />
      <Stack direction="row" spacing={2}>
        <Button onClick={handleOpen}>New Patient</Button>
        <Dropdown
          renderToggle={renderButton}
          placement="bottomEnd"
          menuStyle={style}
          trigger="click">
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              dispatch(logout());
            }}>
            Logout
          </Dropdown.Item>
        </Dropdown>
      </Stack>
    </>
  );
};

const Header = ({ handleDrawerToggle, drawerWidth }) => {
  const {
    globalTheme: {
      header: { backgroundColor, brand, dropdown, app },
    },
  } = useContext(ThemeContext);

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "drawerOpen",
  })(({ theme, drawerOpen }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(drawerOpen && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor,
      }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}>
          <HiOutlineMenuAlt2 />
        </IconButton>
        <Stack
          justifyContent={"space-between"}
          direction="row"
          width="100%"
          alignItems="center">
          <Typography
            fontSize={{ xs: brand.fontSize - 2, md: brand.fontSize }}
            color={brand.color}>
            HOSPITAL NAME
          </Typography>
          <Typography
            fontSize={app.fontSize}
            color={app.color}
            sx={{ display: { xs: "none", sm: "block" } }}>
            PIVOT
          </Typography>
          <UserMenu style={dropdown} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
