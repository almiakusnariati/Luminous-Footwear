import { useState } from "react";
import logo from "../assets/logo.jpg";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menu, setMenu] = useState("shop");

    return (
        <div className="flex flex-col shadow">
            {/* Navbar */}
            <div className="flex justify-around items-center p-4 bg-white">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="h-20 w-40" />
                </div>
                <ul className="flex items-center list-none gap-12 text-darkblue text-lg font-medium">
                    <li
                        className="cursor-pointer flex flex-col items-center"
                        onClick={() => setMenu("shop")}
                    >
                        <Link to="/shop">Shop</Link>
                        {menu === "shop" && (
                            <hr className="w-full border-0 h-0.5 bg-red-500 rounded" />
                        )}
                    </li>
                    <li
                        className="cursor-pointer flex flex-col items-center"
                        onClick={() => setMenu("about")}
                    >
                        <Link to="/about">About</Link>
                        {menu === "about" && (
                            <hr className="w-full border-0 h-0.5 bg-red-500 rounded" />
                        )}
                    </li>
                </ul>
                <div className="flex items-center gap-8">
                    <button className="w-40 h-10 outline-none border border-beige rounded-full text-azure text-lg font-medium bg-white hover:bg-wheat">
                        <Link to="/user/products/login">Login</Link>
                    </button>
                    <ShoppingBag />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
