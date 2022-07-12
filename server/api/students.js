const {Student} = require ('../db')
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


module.exports = router;
