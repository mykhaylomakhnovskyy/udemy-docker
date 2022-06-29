import React from "react";
import Image from "../../../public/logo512.png";

const Header = () => {
    return(
        <div className="py-5 text-center">
            <img src={Image} className="react-image" />
            <h2>Keep Resources</h2>
            <p className="lead">Keep your resource at once place</p>
        </div>
        )
}

export default Header;