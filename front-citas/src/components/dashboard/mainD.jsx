import Aside from "./aside";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function MainD(){
    const dataUser = localStorage.getItem("window");
    return (
        <main>
            <Aside />
            <div>
                <h1>Conoce tu sistema</h1>
            </div>
        </main>
    )
}

export default MainD;