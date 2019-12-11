import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/index";
import { itemTotal } from "./cartHelper";
import Badge from "@material-ui/core/Badge";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul
      className="nav nav-tabs bg-primary"
      style={{ border: "none", padding: "5px" }}
    >
      {/* <a
        class="navbar-brand"
        href="/"
        style={{ color: "#fff", fontWeight: "bold", fontSize: "20px" }}
      >
        Infinity Ecommerce
      </a> */}
      <li className="nav-item">
        <Link className=" nav-link" to="/" style={isActive(history, "/")}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className=" nav-link"
          to="/shop"
          style={isActive(history, "/shop")}
        >
          Shop
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/cart")}
          to="/cart"
        >
          {/* Cart{" "} */}
          <Badge color="secondary" badgeContent={itemTotal()}>
            Cart{"    "}
          </Badge>
          {/* <sup>
            <small className="cart-badge">{itemTotal()}</small>
          </sup> */}
        </Link>
      </li>
      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className=" nav-link"
            to="/user/dashboard"
            style={isActive(history, "/user/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      )}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className=" nav-link"
            to="/admin/dashboard"
            style={isActive(history, "/admin/dashboard")}
          >
            Dashboard
          </Link>
        </li>
      )}
      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className=" nav-link"
              to="/signin"
              style={isActive(history, "/signin")}
            >
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className=" nav-link"
              to="/signup"
              style={isActive(history, "/signup")}
            >
              Sign Up
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className=" nav-link"
            style={{ cursor: "point", color: "#ffffff" }}
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
