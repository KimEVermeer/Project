

  var getNames = function(callBack)
  {
    connection.query('SELECT id AS identiteit, name AS names FROM language', function (err, rows, fields) {
      if (err) throw err;

      for(var i = 0; i<rows.length; i++)
      {
        returnValue.push({
          id : rows[i].identiteit,
          name : rows[i].names
        });
      }

      callBack();
    });
  }

  var getOptions = function(callBack)
  {
    connection.query('SELECT id AS idnr, name AS optie FROM options', function (err, rows, fields) {
        if(err) throw err;

        for(var i = 0; i < rows.length; i++)
        {
          returnValue.push({
            id : rows[i].idnr,
            optie : rows[i].optie
          });
        }

        callBack();
    });
  }