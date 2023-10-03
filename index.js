const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { default: axios } = require('axios')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



const data = {
  select : function(){ 
    return JSON.parse( fs.readFileSync('./test.json') );
  },
  insert: function(newObj){
    const jsonData = data.select();
    const newData = [...jsonData, {id:jsonData.length+1, ...newObj  }]
    fs.writeFileSync('./test.json',JSON.stringify(newData) );
    return newData;
  },
  update:function(){},
  delete:function(){}
}

app.get('/abc', function (req, res) {  
  res.send( data.select() );
})

app.get('/', async function (req, res) {
    let d = await axios('https://opendict.korean.go.kr/api/search?key=4E4101E1F9C6B578FCE4D6CABE483676&target_type=search&req_type=json&part=word&q=%EA%B5%AC%EB%91%90');
    
    res.send(d.data)
})

app.post('/insert', function (req, res) {
  res.send(data.insert(req.body));
});

app.listen(3000)