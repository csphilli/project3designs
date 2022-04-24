import React from "react";
import { Link } from "gatsby";

function Navbar() {
    return (
        <nav>
            <h1>
                <Link to="/">Project3 Studio</Link>
            </h1>

            <div className="links">
                <Link to="/projects">projects</Link>
                <Link to="/videos">videos</Link>
                <Link to="/articles">articles</Link>
                <Link to="/about">about</Link>
            </div>
        </nav>
    );
}

export default Navbar;
