const express = require('../node_modules/express');

const router = express.Router();

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

router.get('/', async (req,res) => {
    
    try{
        const proc = await Projects.get()
        res.status(200).json({proc});
    }
    catch(err){
        res.status(404).json({message: "Projects not found...", err})
    }
})

router.get('/:id', async (req, res) =>{
    // const id = req.params.id
    try{
        const proc = await Projects.get(req.params.id);
        res.status(200).json({proc});
    }
    catch(err){
        res.status(404).json({message: "No project actions found...", err})
    }
})

router.post('/', async (req, res) =>{
    const project = req.body
      
    try{
        const proc = await Projects.insert(project)
        res.status(200).json({proc});
    }
    catch(err){
        res.status(400).json({message: 'action was not posted', err});
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const changes = req.body
    try{
        const action = await Projects.update(id, changes);
        console.log(action)
        res.status(202).json({message: "new project updated!", action});
    }
    catch(err){
        console.log(id, req.body)
        res.status(400).json({message: "Project not found...", err})
    }

}) 

router.delete('/:id', async (req, res) => {
   
    try{
        const action = await Projects.remove(req.params.id);
        res.status(200).json({message: "Project was deleted!", action})
    }
    catch(err){
        res.status(400).json({message: "Action was not deleted...", err})
    }
})

router.post('/:id/actions', async (req, res) =>{
    const project_id = req.params.id
    const data = {project_id, ...req.body}
      
    try{
        const proc = await Actions.insert(data)
        res.status(200).json({proc});
    }
    catch(err){
        res.status(400).json({message: 'action was not posted'})
    }
})

router.get('/:id/actions', validateID, async (req, res) =>{
    try{
        const proc = await Actions.get(req.params.id);
        res.status(200).json({proc});
    }
    catch(err){
        res.status(404).json({message: "No project actions found...", err})
    }
})

function validateID(req, res, next) {
    Actions.get(req.params.id)
        .then( x =>{
            if (x) {
                next()
            } else {

                res.status(404).json({message: 'invalid user id'})
            }
        })

        .catch(err =>{
        res.status(500).json({message: "Server error", err})
        })
    
}

module.exports = router;