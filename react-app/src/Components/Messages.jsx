import { useEffect, useState } from "react";
import '../App.css'
import Navbar from "./Navbar";


function Messages() {
return (
    
    <div className="messages">
        <h2>Üzenetek</h2>
        <div id="messages-div"></div>
        <input placeholder="Új üzenet"/>
        <button id="Messages-button">Küldés</button>
    </div>
);
}


export default Messages;