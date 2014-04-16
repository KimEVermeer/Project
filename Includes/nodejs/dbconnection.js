var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  root     : 'root',
  database : 'transcode'
});

connection.connect();

var returnValue = {};

connection.query('SELECT name AS names, id AS idz FROM language', function(err, rows, fields) {
  if (err) throw err;

  // module.exports='The name is: ', rows[0].names;
  for(var i = 0; i<2; i++)
  {
      console.log(rows[i].names + " " + rows[i].idz);

  }

  returnValue.names = rows[0].names;

});

connection.end();