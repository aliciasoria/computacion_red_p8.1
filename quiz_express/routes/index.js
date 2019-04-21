var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz.js');

//auxiliar y veloz
router.param('quizId',quizController.load);

/* GET home page. */
router.get("/",quizController.login);
router.get('/init', quizController.init);
router.get('/init/newaccount', quizController.newaccount);
router.post('/init/newplayer', quizController.newplayer);

router.get('/credits', quizController.creds);
router.get('/quizzes', quizController.index);
router.get('/checkinit', quizController.check_init);


router.get('/quizzes/new', function(req, res, next) {res.render('new');});
router.post('/quizzes',quizController.create);
//en el formulario de edit solo aparece action="/quizzes" porque el
//method="post" y no se confunde con la ruta de index que es igual pero get


router.get('/quizzes/:quizId(\\d+)',quizController.show);

router.get('/quizzes/:quizId(\\d+)/edit',quizController.edit);
router.put('/quizzes/:quizId(\\d+)',quizController.update);

router.delete('/quizzes/:quizId(\\d+)',quizController.delete);

router.get('/quizzes/:quizId(\\d+)/play',quizController.play);

router.get('/quizzes/:quizId(\\d+)/check', quizController.check);

router.get('/quizzes/random_play',quizController.random_play);

router.get('/quizzes/:quizId(\\d+)/random_check',quizController.random_check);


module.exports = router;
