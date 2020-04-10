// dependencies 
const express = require('express');
const morgan = require('morgan');

const projectRouter = require('./projects/projectRouter.js');
const actionsRouter = require('./actions/actionsRouter.js');

const server = express();

// standard middleware
server.use(logger);
server.use(morgan("dev"));
server.use(express.json());

//Simple Routing
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req,res) =>{
    res.send(`<h2> Servers up.....<h2>`);
})

//Terminal logger
function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.originalURl}`);

    next();
}


module.exports = server;