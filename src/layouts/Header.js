import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  Button,
} from "reactstrap";
// import { ReactComponent as LogoWhite } from "../assets/images/logos/xtremelogowhite.svg";
// import user1 from "../assets/images/users/user4.jpg";
// import smalllogo from '../assets/images/logos/smalllogo.png'
import smalllogo from '../assets/images/logos/logo.PNG'

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };


  const [mqttData, setMqttData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://raymondbackend.onrender.com/api/mqttdata");
        const data = await response.json();
        setMqttData(data);
      } catch (error) {
        console.error("Error fetching MQTT data:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to format date and time from mqttData.dtm
  const formatDateTime = (dtm) => {
    if (!dtm) return '';
  
    const year = dtm.substring(0, 4);
    const month = dtm.substring(4, 6);
    const day = dtm.substring(6, 8);
    const hour = dtm.substring(8, 10);
    const minute = dtm.substring(10, 12);
    const second = dtm.substring(12, 14);
  
    // Convert hour to a number
    const hourNumber = parseInt(hour, 10);
  
    // Determine AM or PM based on the hour
    const period = hourNumber >= 12 ? 'PM' : 'AM';
  
    // Convert hour to 12-hour format
    const hour12 = hourNumber % 12 || 12;
  
    return `${hour12}:${minute}:${second} ${period} ${day}-${month}-${year}`;
  };

  return (
    <Navbar color="white" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          {/* <LogoWhite /> */}
          <img src={smalllogo} alt="not found" height={35} width={40}/>
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
      {/* <img src={smalllogo} alt="not found" height={35} width={40}   /> */}
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/starter" className="nav-link">
              Starter
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem>
        </Nav>
        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
       
        </Dropdown> */}
      </Collapse>
      <h5 style={{marginTop : "10px"}}>{formatDateTime(mqttData.dtm)}</h5>
    </Navbar>
  );
};

export default Header;
