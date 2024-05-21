import * as React from "react";
import SignIn from "../components/SignIn";
import Authors from "../components/Authors";

export default function Main() {
    const [getActiveComponent, setActiveComponent] = React.useState(<SignIn />);
   
    React.useEffect(() => {
        console.log(localStorage.getItem("token"))
        if (localStorage.getItem("token")) setActiveComponent(<Authors />);
    }, [])
    
    return (getActiveComponent);
}