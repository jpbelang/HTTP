/**
 * Created by ebeljea on 10/24/16.
 */


var http = require('http');
var mysql = require('mysql');

const PORT = 8080;

var req = {
    "professeur": "select * from professeur where id = ?",
    "etudiant": "select * from etudiant where id = ?"
};

function handleRequest(request, response) {

    var url = request.url;
    var tid = url.split("/")[1];
    var profid = url.split("/")[2];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'ebeljea',
        password: '',
        database: 'MonApplication'
    });
    connection.connect(function (err) {

        if (err) throw err;
        connection.query(
            {
                sql: req[tid],
                values: [profid]
            },
            function (err, rows) {
                if (err) throw err;

                response.end(JSON.stringify(rows));
                connection.end();
            });

    });
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {

    console.log("Server listening on: http://localhost:%s", PORT);
});