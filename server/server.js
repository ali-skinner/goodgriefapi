const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();


app.get('/', (_req, res) => res.send("Hello To You My Fine Friends - It's Wk1 of Express!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('*', (_req, res) => { 
     res.redirect('/'); 
})