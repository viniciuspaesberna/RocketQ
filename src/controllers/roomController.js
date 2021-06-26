const Database = require('../database/config')

module.exports = {
    async create(req, res){
        const db = await Database()
        const { roomPass } = req.body
        let roomId

        let isRoom = true

        while (isRoom) {
            for (let i = 0; i < 6; i++){
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : 
                roomId += Math.floor(Math.random() * 10).toString()
            }
            
            const roomsExistsIds = await db.all(`SELECT id FROM rooms`)
            isRoom = roomsExistsIds.some(roomsExistsId => roomsExistsId === roomId)

            if (!isRoom){
                await db.run(`INSERT INTO rooms (
                    id, 
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    "${roomPass}"
                )`);
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const db = await Database()

        const room_id = req.params.room_id

        const questions = await db.all(`SELECT * FROM questions WHERE room = ${room_id} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${room_id} and read = 1`)

        let isQuestions = true
        if(questions.length == 0){
            if(questions.length == 0){
                isQuestions = false
            }
        }

        res.render('room', { room_id, questions, questionsRead , isQuestions})
    },

    async enter(req, res){
        const {room_id} = req.body

        res.redirect(`/room/${room_id}`)
    }
}

