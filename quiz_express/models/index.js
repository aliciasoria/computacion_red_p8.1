const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const options = {logging: false};
const sequelize = new Sequelize("sqlite:quizzes.sqlite", options);

const Quiz = sequelize.define(  // define Quiz model (table quizzes)
    'quiz',
    {
        question: Sequelize.STRING,
        answer: Sequelize.STRING
    }
);

sequelize.sync() // Syncronize DB and seed if needed
    .then(() => Quiz.count())
    .then(count => {
        if (count === 0) {
            return Quiz.bulkCreate([
                {question: "Capital of Italy", answer: "Rome"},
                {question: "Capital of France", answer: "Paris"},
                {question: "Capital of Spain", answer: "Madrid"},
                {question: "Capital of Portugal", answer: "Lisbon"}
            ])
                .then(c => console.log(`DB filled with ${c.length} quizzes.`));
        } else {
            console.log(`DB exists & has ${count} quizzes.`);
        }
    })
    .catch(console.log);



    const Players = sequelize.define(  // define Play model (table players)
        'player',
        {
            name: Sequelize.STRING,
            password: Sequelize.TEXT,
            score:Sequelize.INTEGER
        }
    );

    sequelize.sync() // Syncronize DB and seed if needed
        .then(() => Players.count())
        .then(count => {
            if (count === 0) {
                return Players.bulkCreate([
                    {name: "Alicia", password: "123",score:0}

                ])
                    .then(c => console.log(`Players filled with ${c.length} player.`));
            } else {
                console.log(`Player exists & has ${count} players.`);
            }
        })
        .catch(console.log);

    module.exports=sequelize;
