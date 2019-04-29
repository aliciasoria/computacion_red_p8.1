const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const url = process.env.DATABASE_URL || "sqlite:quiz.sqlite";

const options = {logging: false};
const sequelize = new Sequelize(url);//options

const Quiz = sequelize.define(  // define Quiz model (table quizzes)
    'quiz',
    {
        question: Sequelize.STRING,
        answer:Sequelize.STRING
    }
);

  const Players = sequelize.define(  // define Play model (table players)
        'player',
        {
            name: Sequelize.STRING,
            password: Sequelize.TEXT,
            score:Sequelize.INTEGER
        }
    );
    sequelize.sync()
    .then(() => console.log('Data Bases created successfully'))
    .catch(error => {
        console.log("Error creating the data base tables:", error);
        process.exit(1);
    });

    module.exports=sequelize;
