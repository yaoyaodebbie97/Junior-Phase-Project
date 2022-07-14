
const {Campus, Student} = require ('../db')
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.send(campuses);
  }
  catch (err) {
    next(err);
  }
});


router.get('/:id', async(req,res,next) =>{
  try{
    const campus = await Campus.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: Student}]
    })
    if (!campus){
      res.status(404).send('invalid id')
    } else {
      res.send(campus)
    }
  } 
  catch (err) {
    next (err);
  }
})

router.post('/', async(req, res, next) =>{
  try{
    const newCampus = await Campus.create(req.body)
    res.status(201).send(newCampus)
  } catch (err){
    next (err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findOne({
      where: {
        id: req.params.id
      }})
    await campus.destroy();
    res.send(campus);
  } catch (error) {
    next(error);
  }
});

// when updating, also include Students
router.put('/:id', async (req, res, next) => {
  try {
    // const campus = await Campus.findByPk(req.params.id);
    const campus = await Campus.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: Student}]
    })
    res.send(await campus.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.get('/:id/:studentId', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id)
    const student = await Student.findByPk(req.params.studentId);
    campus.removeStudent(student);
    res.send(campus);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
