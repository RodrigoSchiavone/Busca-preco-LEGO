const express = require('express');
const app = express();
const port = 3000;
app.listen(port, ()=> console.log('listening at the port ' + port));
app.use(express.static('public'));
app.use(express.json());

app.post('/api', (request, response)=>{
    console.log(request.body);  
});