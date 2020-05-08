const express = require('../node_modules/express');

const router = express.Router();

const Actions = require('../data/helpers/actionModel');

//middleware

const validateID = async (req, res, next) => {

    try{
        const proc = await Actions.get(req.params.id);
        if(proc){
            next()
        }else{
            res.status(404).json({message: 'invalid user id', proc})
        }
    }catch(err){
        res.status(500).json({message: "Server error", err})
        }
    
}


router.get('/', async (req, res) => {
    
    try{
        const action = await Actions.get()
        res.status(200).json({action});
    }
    catch(err){
        res.status(404).json({message: "Projects not found...", err})
    }
})

router.get('/:id', async (req, res) => {
    
    try{
        const action = await Actions.get(req.params.id)
        res.status(200).json({action});
    }
    catch(err){
        res.status(404).json({message: "Projects not found...", err})
    }
})

router.post('/', validateID, async (req, res) =>{
    try{
        const action = await Actions.insert(req.params.body)
        console.log(action)
        res.status(200).json({message: "new action added!", action});
    }
    catch(err){
        res.status(400).json({message: "Action not found...", err})
    }   
})

router.put('/:id',  validateID, async (req, res) => {
    const id = req.params.id
    const changes = req.body
    try{
        const action = await Actions.update(id, changes);
        console.log(action)
        res.status(202).json({message: "action updated!", action});
    }
    catch(err){
        console.log(id, ...req.body)
        res.status(400).json({message: "Action not found...", err})
    }

})

router.delete('/:id', validateID, async (req, res) => {
 
    try{
        const action = await Actions.remove(req.params.id);
        res.status(200).json({message: "Action was deleted!", action})
    }
    catch(err){
        res.status(400).json({message: "Action was not deleted...", err})
    }
})




module.exports = router;