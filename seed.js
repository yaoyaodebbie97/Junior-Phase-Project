const { green, red } = require("chalk");
const { db } = require("./server/db");
const Student = require ('./server/db/student')
const Campus = require ('./server/db/campus');


const seed = async () => {
  try {
    await db.sync({ force: true });

    // seed your database here!
    const student1 = await Student.create({
      firstName: 'Yao', lastName: 'Guo', email: 'yaoyaodebbie@gmail.com', gpa: 3.9
    })
    const student2 = await Student.create({
      firstName: 'Daisy', lastName: 'Wang', email: 'daisy2000@gmail.com', gpa: 2.5
    })
    const student3 = await Student.create({
      firstName: 'Sam', lastName: 'Kim', email: 'samkim@gmail.com', gpa: 3.3
    })
    const student4 = await Student.create({
      firstName: 'Debbie', lastName: 'Park', email: 'debpark@gmail.com', gpa: 2.8
    })
    const student5 = await Student.create({
      firstName: 'John', lastName: 'Wiley', email: 'johnjohn@gmail.com', gpa: 1.9
    })

    const campus1 = await Campus.create({
      name: 'USC', address: 'LA, California', description: "a great private colledge"
    })

    const campus2 = await Campus.create({
      name: 'UCLA', address: 'LA downtown, California', description: "a great public colledge", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQExu2AIU1MlRQTG_uqLIP_bmGqthaRujRjUw&usqp=CAU'
    })

    const campus3 = await Campus.create({
      name: 'NYU', address: 'New York', description: "a great university", imageUrl: 'https://2mp9xesgrd93v9b8q3vwavu1-wpengine.netdna-ssl.com/wp-content/uploads/2021/07/46bc2094006031.5e737d37ce3c7.jpg'
    })

    await student1.setCampus(campus1)
    await student2.setCampus(campus1)
    await student3.setCampus(campus2)
    await student4.setCampus(campus3)
   

  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
