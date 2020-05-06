import React from "react";
import Search from './Search'
import SignInLink from '../../components/SignInLink'
import BgImage from '../../images/dark_wood.jpg'
const Logo = require('../../images/gitclub_logo.png');



const containerStyle = {
    padding: '0px',
    backgroundImage: `url(${BgImage})`
}

const logoStyle = {
    width: '150px'
}

const navStyle = {
    borderBottom: '3px, white',
    backgroundColor: '303030'
}

function Wrapper(props) {
  return (
    <>
      <div className="container-fluid" style={containerStyle}>
        <div className="navbar gc_nav" style={navStyle}>
          
          
          <a className="title" href="/">
            <img className="logo" style={logoStyle} src={Logo} alt=""/>
          </a>
          <SignInLink />
          <div>
            <Search/> 
          </div>
        </div>
        
        <div className={`wrapper ${props.class}`}>{props.children}
        </div>
      </div>
      
    </>
  );
}

export default Wrapper;