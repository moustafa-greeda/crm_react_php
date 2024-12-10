import React, { useEffect } from "react";
import { useNavigate } from "react-router";
 
export default function Protected(props) {
    const naviget = useNavigate();
    const { Component } = props;
    useEffect(() => {
        let login = localStorage.getItem("login");
        if(!login){
            localStorage.setItem("loginStatus", "Please login to view dashboard!");
            naviget("/", {replace: true});
        }
    }, []);
 
    return(
        <Component />
    );
}