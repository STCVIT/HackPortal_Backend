const participantModel = require('../models/Participant')
const Organiser = require('../models/Organiser')

const getParticipant = (async (req,res,next)=>{
    const participant = await participantModel.findOne({uid:req.userId})
    if(!participant){
        return res.status(400).send('no profile found!')
    }
    req.participant = participant
    next()
})

const getOrganiser = (async (req,res,next)=>{
    const organiser = await Organiser.findOne({uid:req.userId})
    req.organiser = organiser
    next()
})


module.exports = {getParticipant,getOrganiser}