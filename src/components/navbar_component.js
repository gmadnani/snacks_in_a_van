import React, {useState, useEffect} from "react";
import {AppBar, Toolbar, IconButton, Drawer, Link, MenuItem} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
// import styled from "styled-components";
// import "./navbar.css";

const headersData = [
    {
      label: "Listings",
      href: "/listings",
    },
    {
      label: "Mentors",
      href: "/mentors",
    },
    {
      label: "My Account",
      href: "/account",
    },
    {
      label: "Log Out",
      href: "/logout",
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
            // <Link
            //   {...{
            //     component: RouterLink,
            //     to: href,
            //     color: "inherit",
            //     style: { textDecoration: "none" },
            //     key: label,
            //   }}
            // >
              <MenuItem>{label}</MenuItem>
            // </Link>
          //<div>hi</div>
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