const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const app = require("./app.js");
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Servidor rodando, porta 3001");
});