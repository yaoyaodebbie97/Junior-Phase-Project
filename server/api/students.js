const {Student, Campus} = require ('../db')
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  }
  catch (err) {
    next(err);
  }
});



router.get('/:id', async(req,res,next) =>{
  try{
    const student = await Student.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: Campus}]
    })
    if (!student){
      res.status(404).send('invalud id')
    } else {
      res.send(student)
    }
  } 
  catch (err) {
    next (err);
  }
})

module.exports = router;
