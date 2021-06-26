const Database = require('../database/config')


module.exports = {
    async index(req, res){
        const db = await Database()

        const { room_id, question_id, action } = req.params
        const { password } = req.body

        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${room_id}`)
        if (verifyRoom.pass == password) {
            if(action == 'delete'){

                await db.run(`DELETE FROM questions WHERE id = ${question_id}`)

            } else if(action == 'check'){

                await db.run(`UPDATE questions SET read = 1 WHERE id = ${question_id}`)

            } 
            res.redirect(`/room/${room_id}`)
        } else {
            res.render('passincorrect', {room_id: room_id})
        }
    },

    async create(req, res){
        const db = await Database()
        const { room_id } = req.params
        const { question } = req.body

        db.run(`INSERT INTO questions(
            title,
            room,
            read
        )VALUES(
            "${question}",
            ${room_id},
            0
        )`)
            
        res.redirect(`/room/${room_id}`)
    }
}