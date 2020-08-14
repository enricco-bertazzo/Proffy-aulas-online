const database = require('./db')
const createProffy = require('./createProffys')

database.then( async (db) => {

    proffyValue = {
        name: "Enricco Bertazzo", 
        avatar: "https://media-exp1.licdn.com/dms/image/C4E03AQHELw5VzDUifw/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=wEEFrOlhbvkOFzT5Jwir-5TOEUjDkXY8yXSb5RsD8lo", 
        whatsapp: "992112412", 
        bio: "Entusiasta dos melhores nada para se fazer, assim me torno um verdadeiro universitario mantendo sempre uma grande carga horaria de procrastinação, nas horas vagas faço umas merdas"
    }

    classValue = {
        subject: 1, 
        cost: "200"
        //proffy id vira para o banco de dados
    }

    classScheduleValues = [
        // classID vvira pelo banco de dados após cadastrar a aula
        {
            weekday: 1, 
            time_from: 720, 
            time_to: 1220
        },
        {
            weekday: 0, 
            time_from: 520, 
            time_to: 1220
        }
    ]

    // await createProffy(db, {proffyValue, classScheduleValues, classValue})

    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    //consultar as classes de um determinado professor
    //trazer juntos os dados de um prefessor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "1300"
    `)
    // console.log(selectClassesSchedules)
})