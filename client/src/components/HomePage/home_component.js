import React from "react";
import Header from "./header_section";
import VansSection from "./vans_section";
import LittleMenu from "./littlemenu";
import LastSection from "./last_section";
import NavbarComponent from "../Navbar/navbar_component";
import "./home_component.css";

function Home() {
  return (
    <div>
      <NavbarComponent />
      <Header />
      <VansSection />
      <LittleMenu />
      <LastSection />
      <br></br>
      <br></br>
    </div>
  );
}
export default Home;
