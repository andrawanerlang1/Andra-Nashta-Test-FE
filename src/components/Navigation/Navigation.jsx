import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

export default function Navigation() {
  return (
    <div>
      <Navbar className="navbar mb-5" dark expand="xs">
        <NavLink className="navbar-brand nav-link" to="/">
          Home
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="nav-link mr-3" to="/addevent">
              + Add Event
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
