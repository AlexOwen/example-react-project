const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const cors = require('cors');

server.use(cors());
server.use(bodyParser.json());

require('./routes/listitem.js').init(server);
require('./routes/answer.js').init(server);

const port = 3030;

server.listen(port, () => {
    console.log(`API listening on ${port}`);
});