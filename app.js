const express = require('express')
const firebird = require('node-firebird')
fs = require('fs')
const app = express()
const port = process.env.PORT || 3000
 
//starting database connection variables
var options = {};
options.database = 'http://192.168.1.70:888/DB/DATABASE.FDB';
options.user = 'SYSDBA';
options.password = 'masterkey';

app.get('/',(request,response) =>{
    
    firebird.attach(options, function(err, db) {
        db.query('SELECT * FROM PERSON', function(err, result) {   
           
            for (let i = 0; i < result.length; i++) {                        
                for (const [key, value] of Object.entries(result[i])) {
                    if(Buffer.isBuffer(value)){
                    result[i][key] =  `${value}`; 
                    }
                }
            }
            console.log(result)
            return response.json(result)
            db.detach();
        });
    })
})
app.listen(port, () => {
    console.log(`O Servidor está rodando na porta ${port}`)
})