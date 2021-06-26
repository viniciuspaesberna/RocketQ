const Database = require('../database/config')

module.exports = {
    async create(req, res){
        const db = await Database()

        const { room_id } = req.params
        const { answer } = req.body

        await db.run(`UPDATE questions SET answer = "${answer}" WHERE room = ${room_id}`)
        await db.run(`UPDATE questions SET read = 1 WHERE room = ${room_id}`)
            
        res.redirect(`/room/${room_id}`)
    }
}