import React from "react";
import {Link} from "react-router-dom"

function Categories(props){
    return(
        <div>
             <div className="font-bold py-3">
                 Categories
            </div>
            <ul>
                <li>
                    <Link onClick={props.closeMenu} to="/" className="block text-blue-500 py-3  border-t border-b">Home</Link>
                </li>
                <li>
                    <Link onClick={props.closeMenu} to="/about" className="block text-blue-500 py-3 border-b">About</Link>
                </li>
            </ul>
        </div>
    )
}

export default Categories