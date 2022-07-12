const {Campus} = require ('../db')
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


module.exports = router;
