var http = require('http');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  root     : 'root',
  database : 'transcode'
});

var server = http.createServer(function(req, res) {
    connection.connect();

    var returnValue = {};

    var getNames = function(callBack)
    {
        connection.query('SELECT id AS identiteit, name AS names FROM language', function (err, rows, fields) {
            if (err) throw err;

            // module.exports='The name is: ', rows[0].names;
            for(var i = 0; i<=1; i++)
            {
              returnValue.identiteit = rows[i].identiteit;
              returnValue.names = rows[i].names;
            }

            // Console.log(returnValue);

            callBack();
        });
    }

    var getOptions = function(callBack)
    {
      connection.query('SELECT name AS optie FROM options', function (err, rows, fields) {
          if(err) throw err;

          returnValue.identiteit = rows[0].optie;

          callBack();
      });
    }
    /**
     * Always end the request using this function.
     */
    var endCall = function() {
        connection.end();

        // Status code is 200 (Ok).
        res.writeHead(200);

        // Write the object and end the request.
        res.end(JSON.stringify(returnValue));
    }

    getNames(endCall);
    // getOptions(endCall);
});
server.listen(8080);




