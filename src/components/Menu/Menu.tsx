import * as React from "react";
import { Link } from "react-router-dom";


type ItemProps = {
    items: { route: string, description: string }[]
}

const Menu = ({ items }: ItemProps) => {
    return (
        <nav>
            <ul>
                {items.map((item, index) => (<li key={index}>
                    <Link to={item.route}>{item.description}</Link>
                </li>))}
            </ul>
        </nav>
    );
}

export default Menu;
