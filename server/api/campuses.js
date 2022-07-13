
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
      res.status(404).send('invalud id')
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

module.exports = router;
