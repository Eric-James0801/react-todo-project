import React from "react"
import ReactDom from "react-dom"
import { BrowserRouter } from "react-router-dom"
//component file
import Todocontainer from "./functionBased/components/Todocontainer"

//stylesheet
import "./functionBased/App.css"

ReactDom.render(
    <React.StrictMode>
        <BrowserRouter>
            <Todocontainer />
        </BrowserRouter>
    </React.StrictMode>, 
    document.getElementById("root")
)

