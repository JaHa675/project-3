const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname,'client', 'build', 'index.html');


// console.log(publicPath);

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,'client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(publicPath);
    // console.log(publicPath, "Running locally on port 3000");
});

app.listen(port, () => {
    console.log('Server is up!');
});