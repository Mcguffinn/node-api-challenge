const express = require('../node_modules/express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel');

router.get('/', async (req,res) => {
    const proc = await Projects.get()
    try{
        res.status(200).json({proc});
    }
    catch(err){
        res.status(404).json({message: "Projects not found...", err})
    }
})

router.get('/:id', async (req, res) =>{
    const proc = await Projects.getProjectActions(req.params.id);
    try{
        res.status(200).json({proc});
    }
    catch(err){
        res.status(404).json({message: "No project actions found...", err})
    }
})


module.exports = router;