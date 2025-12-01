from pyodbc import connect

class DBClass:
    server = 'SAMUELAMAYAPC'
    bd = 'CitasMedicasBD'
    driver = '{ODBC Driver 17 for SQL Server}'

    @staticmethod
    def get_connection():
        return connect(
            f"DRIVER={DBClass.driver};"
            f"SERVER={DBClass.server};"
            f"DATABASE={DBClass.bd};"
            "Trusted_Connection=yes;"
            "TrustServerCertificate=yes;"
        )

    @staticmethod
    def querySelectWhere(table: str, where: str, params: tuple):
        conexion = DBClass.get_connection()
        cursor = conexion.cursor()

        query = f"SELECT * FROM {table} WHERE {where}"
        cursor.execute(query, params)

        result = cursor.fetchall()
        conexion.close()
        return result
    
    @staticmethod
    def querySelectPermission(user_id:int):
        conexion = DBClass.get_connection()
        cursor = conexion.cursor()

        query = f"SELECT * FROM vw_Permisos WHERE Id = ?"
        cursor.execute(query, (user_id,))

        result = cursor.fetchall()
        conexion.close()
        return result
    
    @staticmethod
    def querySelectAllAppointments():
        conexion = DBClass.get_connection()
        cursor = conexion.cursor()

        query = "SELECT * FROM vw_CitasSinNotas"
        cursor.execute(query)

        result = cursor.fetchall()
        conexion.close
        return result
    
    


