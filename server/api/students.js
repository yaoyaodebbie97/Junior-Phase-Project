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

router.post('/', async(req, res, next) =>{
  try{
    const newStudent = await Student.create(req.body)
    res.status(201).send(newStudent)
  } catch (err){
    next (err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.send(student);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: Campus}]
    })
    res.send(await student.update(req.body));
  } catch (error) {
    next(error);
  }
});


module.exports = router;
