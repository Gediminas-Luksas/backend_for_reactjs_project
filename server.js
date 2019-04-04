const http = require('http');
const app = require('./app');

const port = process.env.PORT || 51515;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
