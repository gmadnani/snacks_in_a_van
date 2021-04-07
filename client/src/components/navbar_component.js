import React, {useState, useEffect} from "react";
import {AppBar, Toolbar, IconButton, Drawer, Link, MenuItem, Button} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
// import styled from "styled-components";
// import "./navbar.css";

const headersData = [
    {
     label:"Home",
     href: "/", 
    },
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Register",
      href: "/register",
    },
    {
      label: "My Account",
      href: "/account",
    },
    {
      label: "Log Out",
      href: "/logout",
    },
    {
      label: "Menu",
      href: "/Menu",
    },
  ];

function Navbar() {
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    })
    const { mobileView, drawerOpen } = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 900
            ? setState((prevState) => ({ ...prevState, mobileView: true }))
            : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveness();
        
        window.addEventListener("resize", () => setResponsiveness());
    },[]);

    const displayDesktop = () => {
        return (
          <Toolbar>
              <IconButton
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                }}
                >
                Snack in a Van
            </IconButton>
            <div>{getNavbarButtons()}</div>
          </Toolbar>
        );
      };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));

        return (
            <Toolbar>
                <IconButton
                    {...{
                        edge: "start",
                        color: "inherit",
                        "aria-label": "menu",
                        "aria-haspopup": "true",
                        onClick: handleDrawerOpen,
                    }}
                    >
                    <MenuIcon/>
                </IconButton>

                <Drawer
                {...{
                    anchor: "left",
                    open: drawerOpen,
                    onClose: handleDrawerClose,
                }}
                >
                <div>{getDrawerChoices()}</div>
                </Drawer>
            <div>Snack in a Van</div>
            </Toolbar>
        );
      };

      const getDrawerChoices = () => {
        return headersData.map(({ label, href }) => {
          return (
            <Link
              {...{
                component: RouterLink,
                to: href,
                color: "inherit",
                style: { textDecoration: "none" },
                key: label,
              }}
            >
              <MenuItem>{label}</MenuItem>
             </Link>
            );
        });
      };

      const getNavbarButtons = () => {
        return headersData.map(({ label, href }) => {
          return (
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: RouterLink,
              }}
            >
              {label}
            </Button>
          );
        });
      };

    return (
        <navbar>
            <AppBar className= {Navbar}>
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </navbar>
    );
}
export default Navbar;