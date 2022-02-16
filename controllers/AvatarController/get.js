const Sentry = require('$sentry');
const db = require('$db');
const service_email = require("$services/Mail/index");
const JWT = require('jsonwebtoken')
const path = require('path');
const fs = require('fs')
const stream = require('stream')

/**
 * @generator controller generated by kraaken-cli
 * @param req
 * @param res
 * @description AvatarController
 * @type {Express}
 */
const AvatarController = async (req, res) => {

    try {
        const {name, uuid} = req.params;

        const user = await db.user.findUnique({
            where: {
                uuid
            }
        });

        if(!user) {
            return res.status(400).json({
                error: '',
                message: 'User not found'
            });
        }

        const r = fs.createReadStream(path.join(__dirname, '../../public/images/avatar/' + name)) // or any other way to get a readable stream
        const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
        stream.pipeline(
            r,
            ps, // <---- this makes a trick with stream error handling
            (err) => {
                if (err) {
                    console.log(err) // No such file or any other kind of error
                    return res.sendStatus(400);
                }
            })
        ps.pipe(res) // <---- this makes a trick with stream error handling
    } catch (err){
        /**
         * @type {Kraaken|prisma}
         * @description Send error to kraaken
         */
      

        /**
         * @description returning an error from request
         */
        return res.status(500).send('Server Error');
    }

}

/**
 * @description Exporting only function, because they will be auto discovered.
 * @type {function}
 */
module.exports = AvatarController