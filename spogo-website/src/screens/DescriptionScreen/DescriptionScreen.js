import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";

const DescriptionScreen = (props) => {
    let path = props.url;
    let UID = path.substring(path.lastIndexOf("/") + 1);
    return (
        <Link to={`/users/${UID}`} className="Link">
            <div>
                <h1>Hello</h1>
            </div>
        </Link>
    )
}

export default DescriptionScreen
