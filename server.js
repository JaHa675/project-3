const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'project-3','build');


console.log(publicPath);

const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
    console.log(publicPath, "do you see me");
});
app.listen(port, () => {
    console.log('Server is up!');
});