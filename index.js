var mysql = require('mysql');
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/json'
    });
    var q = url.parse(req.url, true);
    var datos = q.query;
    var accion = datos.accion;

    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "biblioteca"
    });

    let sql = "";
    let parametros = [];

    let tabla = datos.tabla;

    if (tabla == "tbl_alumnos") {
        switch (accion) {

            case "insert":
                sql = "insert into tbl_alumnos " +
                    " ( nombre, apellido ) " +
                    " values  " +
                    " (?, ?) ";
                parametros = [datos.nombre,
                    datos.apellido,
                ];
                break;
            case "select":
                sql = "select * from tbl_alumnos ";
                break;
            case "update":

                sql = " update tbl_alumnos " +
                    " set  nombre = ? ,  " +
                    " apellido = ? , " +
                    " where id_alumno = ? ";
                parametros = [datos.nombre,
                    datos.apellido,
                    datos.id_alumno
                ];

                break;
            case "delete":
                sql = "delete from tbl_alumnos where id_alumno = ?"
                parametros = [datos.id_alumno];
                break;
            default:
                sql = "";
                break;

        }
    }

    if (tabla == "tbl_libro") {
        switch (accion) {

            case "insert":
                sql = "insert into tbl_libro " +
                    " ( nombre, genero, fecha_lanzamiento, autor ) " +
                    " values  " +
                    " (?, ?, ?, ?) ";
                parametros = [datos.nombre,
                    datos.genero, datos.fecha_lanzamiento, datos.autor
                ];
                break;
            case "select":
                sql = "select * from tbl_libro ";
                break;
            case "update":

                sql = " update tbl_libro " +
                    " set  nombre = ? ,  " +
                    " genero = ? , " +
                    " fecha_lanzamiento = ? , " +
                    " autor = ? , " +
                    " where id_libro = ? ";
                parametros = [datos.nombre,
                    datos.genero,
                    datos.fecha_lanzamiento,
                    datos.autor
                ];

                break;
            case "delete":
                sql = "delete from tbl_libro where id_libro = ?"
                parametros = [datos.id_libro];
                break;
            default:
                sql = "";
                break;

        }
    }

    if (tabla == "prestamos") {
        switch (accion) {

            case "insert":
                sql = "insert into prestamos " +
                    " ( id_libro, id_alumno, fecha_prestamo ) " +
                    " values  " +
                    " (?, ?, ?) ";
                parametros = [datos.id_libro,
                    datos.id_alumno, datos.fecha_prestamo
                ];
                break;
            case "select":
                sql = "select * from prestamos ";
                break;
            case "update":

                sql = " update prestamos " +
                    " set  id_libro = ? ,  " +
                    " id_alumno = ? , " +
                    " fecha_prestamo = ? , " +                    
                    " where id_prestamo = ? ";
                parametros = [datos.id_libro,
                    datos.id_alumno,
                    datos.fecha_prestamo            
                ];

                break;
            case "delete":
                sql = "delete from prestamos where id_prestamo = ?"
                parametros = [datos.id_prestamo];
                break;
            default:
                sql = "";
                break;

        }
    }


    con.connect(function (err) {

        if (err) {
            console.log(err);
        } else {

            con.query(sql, parametros, function (err, result) {

                if (err) {
                    console.log(err);

                } else {
                    res.write(JSON.stringify(result));
                    res.end();
                }

            });

        }

    });


}).listen(3000);