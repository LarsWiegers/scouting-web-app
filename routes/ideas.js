var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection;
var dateFormat = require('dateformat');
function createConnection() {
  return mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'scouting'
  });
}
function getIdeas(connection, callback) {
  connection.query('SELECT * FROM lists', function (err, rows, fields) {
    if (err) throw err;
    for (let i = 0; i < rows.length; i++) {
      connection.query('SELECT * FROM lists_resources WHERE list_id = ' + rows[i].id, function (err, resourceRows, fields) {
        if(err) { console.log(err)}
        if(resourceRows) {
          rows[i].amount_of_resources = resourceRows.length;
        }

      });
    }
    callback(rows);
  });
}

function getResourcesById(id, callback) {
    connection.query('SELECT * FROM resources WHERE id = ' + id, function (err, resourcesRows, fields) {
      if (err) {
        console.log(err)
      }
      callback(resourcesRows);
    });
}

function fillResourcesOnList(row, pivotRows, callback) {
  row.resources = [];
  for (let j = 0; j < pivotRows.length ; j++) {
    getResourcesById(pivotRows[j].resource_id, function(data) {
      row.resources.push(data[0]);
      callback(row);
    });
  }
}

function getIdea(connection, id, callback) {
  connection.query('SELECT * FROM lists WHERE id = ?',[ id ], function (err, row, fields) {
    if (err) throw err;
      connection.query('SELECT * FROM lists_resources WHERE list_id = ' + row[0].id, function (err, pivotRows, fields) {
        if (err) {
          console.log(err)
        }
        if (pivotRows.length !== 0) {
          fillResourcesOnList(row[0], pivotRows, function(row){
            callback(row);
          });
        } else {
          callback(row[0]);
        }
      });
  });
}


/* GET ideas page. */
router.get('/', function(req, res, next) {
  connection = createConnection();
  connection.connect(function(err) {
    if(err) {
      console.log(err);
      res.render('ideas.twig', {error: "Er kon geen connectie gemaakt worden met de database!"});
    }
    else {
      getIdeas(connection,function(data) {
        connection.end(function(err) {
          res.render('ideas.twig', {lists: data});
        });

      });
    }
  });
});

/* POST ideas page. */
router.post('/', function(req, res, next) {
  if(!req.body.name) {
    return res.redirect('/ideas/add');
  }
  connection = createConnection();
  connection.connect(function(err) {
    if(err) {
      console.log(err);
      return res.redirect('/ideas/add');
    }
    else {
      if(req.body._method === 'PUT' && req.body.name && req.body.id) {
        connection.query('UPDATE lists set name = ?, updated_at = ? WHERE id = ?',[
          req.body.name, dateFormat(new Date(), "dd-mm-yyyy h:MM:ss"), req.body.id
        ], function (err, rows, fields) {
        });
        connection.end(function(err) {
          return res.redirect('/ideas');
        });
      }else if(req.body._method === 'DELETE' && req.body.id) {
        console.log("DELETE");
        connection.query('DELETE FROM lists WHERE id = ?',[
          req.body.id
        ], function (err, rows, fields) {
        });
        connection.query('DELETE FROM lists_resources WHERE list_id = ?',[
          req.body.id
        ], function (err, rows, fields) {
        });
        connection.end(function(err) {
          return res.redirect('/ideas');
        });
      }else {
        connection.query('INSERT INTO lists (name, created_at, updated_at) VALUES(?, ?, ?)',[
          req.body.name, dateFormat(new Date(), "dd-mm-yyyy h:MM:ss"), dateFormat(new Date(), "dd-mm-yyyy h:MM:ss")
        ], function (err, rows, fields) {
        });
        connection.end(function(err) {
          return res.redirect('/ideas');
        });
      }
    }
  });
});

/* GET ideas add page */
router.get('/add', function(req, res, next) {
  connection = createConnection();
  connection.connect(function(err) {
    if(err) {
      return res.redirect('/ideas');
    }
    else {
      connection.end(function(err) {
        res.render('ideas-add.twig');
      });
    }
  });

});

router.get('/:id/edit', function(req, res, next) {
  connection = createConnection();
  connection.connect(function(err) {
    if(err) {
      return res.redirect('/ideas');
    }
    else {
      getIdea(connection, req.params.id, function(data){

        connection.end(function(err) {
          res.render('ideas-edit.twig', {list: data});
        });
      });

    }
  });

});
router.get('/:id/add', function(req, res, next) {
  connection = createConnection();
  connection.connect(function(err) {
    if(err) {
      return res.redirect('/ideas');
    }
    else {
      getIdea(connection, req.params.id, function(data){

        connection.end(function(err) {
          res.render('ideas-add-add.twig', {list: data});
        });
      });

    }
  });

});
router.post('/:id/add', function(req, res, next) {
  connection = createConnection();
  connection.connect(function(err) {
    if(err) {
      return res.redirect('/ideas');
    }
      console.log(req.body);
    return res.redirect('/ideas/' + req.params.id + '/edit');
  });

});

module.exports = router;

