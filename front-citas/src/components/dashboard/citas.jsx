import Aside from "./aside";
import CardCita from "./CardCita";
import { useEffect, useState } from "react";

function Citas() {
    const data = JSON.parse(localStorage.getItem("data"))
    const { RoleID } = data.user;
    const [citasData, setCitasData] = useState("")
        
    useEffect(() => {
        console.log(RoleID)
        switch (RoleID){
            case "1":
                allCitas();
                console.log(citasData)
                break;
            default:
                console.log("ROL NO VALIDO");
        }
    },[])

    function allCitas() {
        fetch('http://127.0.0.1:8000/api/v1/appointments/all')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCitasData(data)
            })
            .catch(err => console.error(err))
    }

    return (
        <main>
            <Aside />
            {citasData && <CardCita citasData={citasData} />}
        </main>
    )
}
export default Citas;