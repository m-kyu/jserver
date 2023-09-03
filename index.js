const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const data = {
    load : ()=>{
        const dataRead =  fs.readFileSync('./test.json');
        const dataJson = JSON.parse(dataRead);
        return dataJson;
    },
    save : (bodyObj)=>{
        const getAll = data.load();
        const insertObj =[...getAll,{id:getAll.length+1,...bodyObj}];
        fs.writeFileSync('./test.json',JSON.stringify(insertObj))
        return 'sccess';
    }
}


app.get('/', function (req, res) {
    res.send(data.load())
})

app.post('/insert', function (req, res) {
     res.send(data.save(req.body))
 })

app.listen(3000)