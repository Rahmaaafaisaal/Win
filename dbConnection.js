const sql=require('mssql');

var dbConfig = {
    user:  "winAdmin",
    password: "123456",
    server: "LAPTOP-SJH58R2J",
    database:"WIN"
};



//  var dbConn = new sql.Connection(dbConfig);


// dbConn.connect().then(function () {
//     var request = new sql.Request(dbConn);
//     request.query("select * from buyer").then(function (resp) {
//         console.log(resp);
//         dbConn.close();
//     }).catch(function (err) {
//         console.log(err);
//         dbConn.close();
//     });
// }).catch(function (err) {
//     console.log(err);
// });



var  executeQuery = function( ){             
    sql.connect(dbConfig, function (err) {
        if (err) {   
                    console.log("Error while connecting database :- " + err);
                  
                 }
                 else {
                        // create Request object
                        var request = new sql.Request();
                        // query to the database
                        request.query('select * from buyer', function (err, res) {
                          if (err) {
                                     console.log("Error while querying database :- " + err);
                                     
                                    }
                                    else {
                             
                                           }
                              });
                      }
     });           
}


executeQuery();