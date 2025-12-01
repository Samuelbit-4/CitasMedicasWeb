function CardCita(props){
    const datosCitas = props.citasData
    return(
        <div>{
            datosCitas.map(c =>(
                <div key={c.AppointmentID}>
                    <h2>Fecha de la cita: {c.AppointmentDate}</h2>
                    <h3>Nombre de paciente: {c.Patient.PatientFullName}</h3>
                    <p>Doctor: {c.Doctor.DoctorFullName}</p>
                </div>
            ))       
        }</div>
    )
}
export default CardCita