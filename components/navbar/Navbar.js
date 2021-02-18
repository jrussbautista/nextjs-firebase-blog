import React from "react";
import Link from "next/link";

const Navbar = () => {
  const user = null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">Dev</a>
        </Link>

        <ul className="navbar-nav">
          {user ? (
            <li className="nav-item">
              <Link href="/account">
                <a className="nav-link">Account</a>
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link href="/signin">
                <a className="nav-link">Sign In</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
