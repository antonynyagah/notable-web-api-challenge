
require('dotenv').config();
const server = require('./server.js');

const port = 2008
server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});