const errorHandler = require("../../../middleware/errorHandler")
const { BadRequestError } = require("../../../utils/error")

async function deleteProfile(req,res,next){
    try { 
        await req.participant.remove()
        next()
    }catch(e) {
        errorHandler(new BadRequestError,req,res)
    }
}

module.exports = deleteProfile