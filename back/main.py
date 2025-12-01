from fastapi import FastAPI
from DB import DBClass
from User import User
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringirlo a ["http://127.0.0.1:5500"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/users")
def login(user: User):
    username = user.username
    password = user.password

    result = DBClass.querySelectWhere(
        "Usuarios",
        "Email = ? AND PasswordHash = ?",
        (username, password)
    )

    if not result:
        return {
            "code": "400",
            "msg": "Usuario y/o contraseña invalidos"
        }

    print(result)
    user_id = result[0]
    role_id = result[7]
    firstName = result[1]
    lastNames = result[2]
    permisos = DBClass.querySelectPermission(user_id)
    permisos_list = []

    for row in permisos:
        permisos_list.append({
            "PermissionID": row[6],
            "PermissionName": row[7]
        })
    return {
        "code": "200",
        "user": {
            "UserID": user_id,
            "RoleID": role_id,
            "Name": firstName,
            "LastName": lastNames,
            "Username": username
        },
        "permisos": permisos_list
    }

@app.get("/api/v1/appointments/all")
def getAllAppointments():
    results = DBClass.querySelectAllAppointments()

    if not results:
        return { "msg": "No se encuentran citas registradas" }

    appointments = []

    for row in results:
        birthdate = row.BirthDate       # datetime.date
        formatted_birth = birthdate.strftime('%d/%m/%Y')
        appointmentDate = row.AppointmentDate
        appointmentDateForm = appointmentDate.strftime("%d/%m/%Y %I:%M %p")

        appointments.append({
            "AppointmentID": row.AppointmentID,
            "AppointmentDate": appointmentDateForm,
            "Patient": {
                "PatientFullName": row.PatientFullName,
                "BirthDate": formatted_birth,
                "Gender": row.PatientGender,
                "Phone": row.Phone,
                "Email": row.Email,
                "Age": row.Edad
            },
            "Doctor": {
                "DoctorFullName": row.FullNameDoctor,
                "Phone": row.DoctorPhone,
                "Email": row.DoctorEmail
            }
        })

    return appointments

@app.get("/api/v1/appointments/doctor/{id}")
def getDoctorAppointments(id: int):
    result = DBClass.querySelectWhere("vw_CitasDeHoy","DoctorID = ?", (id,))
    if not result:
        return {
            "code": "400",
            "msg": "Doctor sin citas hoy"
        }
    appointments = []

    for row in result:
        birthdate = row.BirthDate       # datetime.date
        formatted_birth = birthdate.strftime('%d/%m/%Y')
        appointmentDate = row.AppointmentDate
        appointmentDateForm = appointmentDate.strftime("%d/%m/%Y %I:%M %p")

        appointments.append({
            "AppointmentID": row.AppointmentID,
            "AppointmentDate": appointmentDateForm,
            "Patient": {
                "PatientFullName": row.PatientFullName,
                "BirthDate": formatted_birth,
                "Gender": row.PatientGender,
                "Phone": row.Phone,
                "Email": row.Email,
                "Age": row.Edad
            },
            "Doctor": {
                "DoctorFullName": row.FullNameDoctor,
                "Phone": row.DoctorPhone,
                "Email": row.DoctorEmail
            }
        })

    return appointments

