const server = require('./server.js');

// PORT ~ this setups a dynamic port and defaults to 5000 if none is set
const port = process.env.PORT || 5000


server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});