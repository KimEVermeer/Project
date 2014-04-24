var http = require('http');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  root     : 'root',
  database : 'transcode'
});

var server = http.createServer(function(req, res) {

  var returnValue = [];

  var getTranslation = function(callBack)
  {
    connection.query('SELECT t.id AS translationid, t.optionId AS optionid, o.name AS optionname, ' +
                      'o.color AS color, t.languageid AS languageid, l.name AS languagename, '+
                      'translation AS translation ' +
                      'FROM translation t ' +
                      'INNER JOIN options o ' +
                      'ON t.optionId = o.id ' +
                      'INNER JOIN language l ' +
                      'ON t.languageid = l.id' +
    '' , function (err, rows, fields) {
      if(err) throw err;

      for(var i = 0; i < rows.length; i++) {
        returnValue.push({
          id         : rows[i].translationid,
          optionid   : rows[i].optionid,
          optionname : rows[i].optionname,
          color      : rows[i].color,
          languageid : rows[i].languageid,
          language   : rows[i].languagename,
          translation: rows[i].translation
        });
      }

      callBack();
    });
  }


  /**
   * Always end the request using this function.
   */

  var endCall = function() {
      // Status code is 200 (Ok).
      var headers = {};
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Content-Type"] = "application/json";
      res.writeHead(200, headers);
      
      // Write the object and end the request.
      res.end(JSON.stringify(returnValue));
  }

  getTranslation(endCall);

});
server.listen(8080);




