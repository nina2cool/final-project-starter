import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

const TopNavbar = (props) => {
  return (
    <Navbar fixedTop collapseOnSelect className="navbar_format overlay">
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/"><span className="hvr-grow"><img src="favicon.png" alt="Christina McMillan" className="image_logo"/> Christina&#39;s Final Project</span></Link>
        </Navbar.Brand>
        { props.showNavItems ? <Navbar.Toggle /> : null }
      </Navbar.Header>
      {
        props.showNavItems ?
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem onClick={props.onSignOut}><span className="hvr-grow">Sign Out</span></NavItem>
            </Nav>
            <Nav pullRight>
              <Link to="/secret"><Navbar.Text><span className="hvr-grow">Secret</span></Navbar.Text></Link>
            </Nav>
            <Nav pullRight>
              <Link to="/yelp"><Navbar.Text><span className="hvr-grow">Search Yelp</span></Navbar.Text></Link>
            </Nav>
            <Nav pullRight>
              <Link to="/listindex"><Navbar.Text><span className="hvr-grow">My Lists</span></Navbar.Text></Link>
            </Nav>
          </Navbar.Collapse>
          : null
      }
    </Navbar>
  );
}

TopNavbar.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  showNavItems: PropTypes.bool.isRequired
};

export default TopNavbar;
