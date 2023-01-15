// const express = require('express');
import express from 'express'
const app = express();


// const baseDir = `./dist/assets`;
const port = 4001


app.use(express.static('./dist/'))
app.get('*', (req, res) => res.sendFile('index.html', {root: './dist'}));

app.listen(port, () => console.log(`Server running at http://localhos:${port}`))


