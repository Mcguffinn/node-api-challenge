const express = require('../node_modules/express');

const router = express.Router();

const Actions = require('../data/helpers/actionModel');

router.post('/', validateID, async (req, res) =>{
    const action = await Actions.insert(req.body)

    try{
        console.log(req.body)
        action
    }
    catch(err){
        res.status(400).json({message: 'action was not posted'})
    }
})

router.get('/', async (req, res) => {
    const action = await Actions.get()
    try{
        res.status(200).json({action});
    }
    catch(err){
        res.status(404).json({message: "Projects not found...", err})
    }
})

router.get('/:id', async (req, res) => {
    const action = await Actions.get(req.params.id)
    try{
        res.status(200).json({action});
    }
    catch(err){
        res.status(404).json({message: "Projects not found...", err})
    }
})

//middleware

async function validateID(req, res, next) {
    const id = await Actions.get(req.params.id);

    try{
        id
        next()
    }
    catch{
        res.status(404).json({message: 'invalid action id'})
    }
    
}

module.exports = router;