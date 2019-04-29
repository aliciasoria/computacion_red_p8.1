const sequelize = require("../models/index.js");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//función auxiliar si el parámetro quizId no es válido
exports.load=(req,res,next,quizId)=>{
  sequelize.models.quiz.findByPk(quizId)
  .then(quiz=>{
    if(!quiz){throw new Error("There is no quiz with id="+quizId);}else{req.quiz=quiz;next();}
  })
};

exports.init =(req,res,next)=>{res.render("index");req.session.randomPlay=[]; };
exports.creds=(req,res,next)=>{res.render("credits");};

exports.index=(req,res,next)=>{
  sequelize.models.quiz.findAll()
  .then(quizzes=>{res.render('quizzes/index.ejs',{quizzes});})};
  exports.show=(req,res,next)=>{
    const{quiz}=req;
    res.render('show',{quiz});
  };
exports.create=(req,res,next)=>{
  const quiz = {question:req.body.question,answer:req.body.answer};
  if(!quiz.question || !quiz.answer){
    res.render("new");
    return;
  }
    sequelize.models.quiz.create(quiz)
    .then(()=>{res.redirect('/quizzes');})};



exports.edit=(req,res,next)=>{
  const {quiz}=req;
  res.render("edit",{quiz});
};

exports.update=(req,res,next)=>{
  const id = Number(req.params.quizId);
  const quiz={
    id:id,
    question:req.body.question,
    answer:req.body.answer};
    if(!quiz.question || !quiz.answer){
      res.render("edit",{quiz});
      return;
    }
  sequelize.models.quiz.update(quiz,{where: {id: Number(req.params.quizId)}})
  .then(()=>{res.redirect('/quizzes/'+id);})
};

exports.delete=(req,res,next)=>{
  const id = Number(req.params.quizId);
  console.log(id);
  sequelize.models.quiz.destroy({where:{id:id}})
  .then(()=>{res.redirect('/quizzes');})
};

exports.play=(req,res,next)=>{
  const {quiz}=req;
  res.render('play',{quiz});
};

exports.check=(req,res,next)=>{
  const {query,quiz}=req;
  const answer = query.answer;
  let result = 0;
  if(quiz.answer.toLowerCase().trim()===answer.toLowerCase().trim()){result=1;}
  res.render('check',{answer,result});
};

exports.random_play=(req,res,next)=>{
  let len = 0;
  let randomid = 0;
  let randomnum=0;
  let ids =[];
  if(!req.session.randomPlay){req.session.randomPlay=[];}
  sequelize.models.quiz.findAll(  {where:{id:{[Op.notIn]:req.session.randomPlay}   } }  )
  .then(quizzes=>{ quizzes.forEach(quiz=>{ids.push(quiz.id);}); })
  .then(()=>{ len = ids.length;  randomnum = Math.floor(Math.random()*len); randomid=ids[randomnum];  })
  .then(()=>{ sequelize.models.quiz.findByPk(randomid).then(quiz=>{res.render("random_play",{quiz});  })  })
};



exports.login=(req,res,next)=>{
res.render("login",{layout: null});
};

exports.check_init=(req,res,next)=>{
  let result =0;
  const name = req.query.name;
sequelize.models.player.findAll()
.then(players=>{
    players.forEach(player=>{
    let condition = (req.query.name == player.name) && (req.query.password == player.password);
    if(result===0 && condition){
      result = 1 ;
      req.session.currentId = player.id;
    console.log(req.session.currentId);}
    })
})
.then(()=>{
  res.render("checkinit",{result,name,layout:null});
})

};

exports.random_check=(req,res,next)=>{
  const {query,quiz}=req;
  const answer = query.answer;
  let result = 0;
  let totalscore;
  sequelize.models.player.findByPk(Number(req.session.currentId))
  .then(player=>{
    if(quiz.answer.toLowerCase().trim()===answer.toLowerCase().trim()){
    result=1;
    req.session.randomPlay.push(quiz.id);
    player.score = player.score+1;
    totalscore = player.score;
    console.log(player.score);
    }
})
.then(()=>{
sequelize.models.quiz.findAll()
    .then(quizzes=>{
       if(quizzes.length === req.session.randomPlay.length){
          req.session.randomPlay=[];//lo vacías para poder volver a jugar esta session

          res.render("random_none",{totalscore});
  }else{
    res.render("random_check",{answer,result});
  }
})

})

};



exports.newaccount=(req,res,next)=>{
  res.render("newaccount");
};
exports.newplayer=(req,res,next)=>{
const name = req.body.name;
const result=1;
  const player = {name:req.body.name,password:req.body.password,score:0};
  if(!player.name || !player.password){
    res.render("login");
    return;
  }
    sequelize.models.player.create(player)
    .then(()=>{res.render("checkinit",{result,name,layout:null});
})

};
