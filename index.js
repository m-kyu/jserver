const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { default: axios } = require('axios')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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


app.get('/', async function (req, res) {
    let d = await axios('https://opendict.korean.go.kr/api/search?key=4E4101E1F9C6B578FCE4D6CABE483676&target_type=search&req_type=json&part=word&q=%EA%B5%AC%EB%91%90');
    
    res.send(d.data)
})

app.post('/insert', function (req, res) {
     res.send(data.save(req.body))
 })

app.listen(3030)