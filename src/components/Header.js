import styled from "styled-components";
import React from "react";
import { NavLink } from "react-router-dom";
import SiteLogo from "./logo192.png";
import Nav from "./Nav";


const Header = () => {
    return (
<MainHeader>
    <NavLink to='/'>
        <img height={50} src={SiteLogo} alt="Logo"/>
    </NavLink>
    <Nav />
</MainHeader>
        
)};

const MainHeader = styled.header`
padding: 0 0.8rem;
height: 10rem;
background-color: ${({ theme }) => theme?.colors?.bg};
display: flex;
justify-content: space-between;
align-items: center;
position: relative;

.logo{
    height: 5rem;
}

`;



export default Header;