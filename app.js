const express = require('express')
const firebird = require('node-firebird')
const app = express()
const port = process.env.PORT || 3000
 
//starting database connection variables
var options = {};
options.database = 'C:/TESTE/DATABASE.FDB';
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
            return response.json(result)
            db.detach();
        });
    })
})
app.listen(port, () => {
    console.log(`O Servidor está rodando na porta ${port}`)
})