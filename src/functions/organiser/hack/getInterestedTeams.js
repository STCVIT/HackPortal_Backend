const errorHandler = require('../../../middleware/errorHandler')
const paginate = require('../../../middleware/paginate')
const Hack = require('../../../models/Hack')
const DN_Team = require('../../../models/Dn-Team')
const { NotFoundError, BadRequestError } = require('../../../utils/error')
const participantModel = require('../../../models/Participant')

const getInterestedTeams = async(req,res)=>{
    let final = []
    try {
        const page = Number(req.query.page)
        const hack = await Hack.find({_id:req.params.hack_id,organiser_id:req.organiser._id})
        if(!hack){
            return errorHandler(new NotFoundError,req,res)
        }
        const teams = await DN_Team.find({hack_id:req.params.hack_id})
        if(teams.length===0 || !teams){
            return errorHandler(new NotFoundError,req,res)
        }
        let length = teams.length
        const newTeams = paginate(teams,12,page)
        if(!newTeams || newTeams.length==0){
            return errorHandler(new NotFoundError,req,res)
        }
        console.log(newTeams)
        let i = 0
        newTeams.forEach(async(team)=>{
            let members = team.members.map((member)=>member.uid)
            const participants = await participantModel.find({_id:{$in:members}})
            let temp = {
                team,
                participants
            }
            final.push(temp)
            i++
            if(newTeams.length==i){
                console.log(final)
                res.status(200).send({final,length})  
            }
        })
         
    } catch (e) {
        errorHandler(new BadRequestError,req,res)
    }   
}
//check this
module.exports = getInterestedTeams