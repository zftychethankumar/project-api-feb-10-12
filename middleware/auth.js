
//auth middleware
const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    try {
        // read the token headers
        const token = req.header('Authorization')

        // verify the token
        await jwt.verify(token,process.env.ACCESS_SECRET, (err,user) => {
            if(err)
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, msg: `unauthorized token or token expired`})

            // if valid token it will return user id

            // create req const
            req.userId = user.id

            //continue connection to main controller
            next()
            // res.json({ user })
        })

        // verify the token
        // res.json({ middle : token })
    } catch(err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status : false, msg: err.message})
    }
}

module.exports = auth