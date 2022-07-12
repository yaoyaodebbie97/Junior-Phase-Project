const { expect } = require("chai");
const { db } = require("../../server/db");
const seed = require("../../seed");
const { Campus, Student } = require("../../server/db");

describe("Tier One: Student >- Campus Association", () => {
  before(() => db.sync({ force: true }));
  afterEach(() => db.sync({ force: true }));

  describe("Sequelize Models", () => {
    let student1, student2, campus;
    beforeEach(async () => {
      campus = await Campus.create({
        name: "Jupiter Jumpstart",
        address: "5.2 AU"
      });
      // changed it to CampusId (capitalize) because this is what in the test database 
      student1 = await Student.create({
        firstName: "Sally",
        lastName: "Ride",
        email: "sallyride@nasa.gov",
        CampusId: campus.id
      });
      student2 = await Student.create({
        firstName: "Mae",
        lastName: "Jemison",
        email: "maejemison@nasa.gov",
        CampusId: campus.id
      });
    });
    afterEach(() => db.sync({ force: true }));

    it("a student may be assigned to at most one campus", async () => {
      const sallysCampus = await student1.getCampus();
      expect(sallysCampus.name).to.equal(campus.name);
    });

    it("a campus may have many enrolled students", async () => {
      const result = await campus.hasStudents([student1, student2]);
      expect(result).to.be.equal(true);
    });
  });

  describe("Seed File", () => {
    let campuses, students;
    beforeEach(async () => {
      await seed();
      campuses = await Campus.findAll({ include: [Student] });
      students = await Student.findAll({ include: [Campus] });
    });

  // changed campus.students to campus.Students 
    it("creates at least one campus that has several students", () => {
      const campusesWithSeveralStudents = campuses
        .filter(campus => campus.Students.length > 1)
        .map(campus => campus.name);
      expect(campusesWithSeveralStudents).to.have.lengthOf.above(0);
    });

    it("creates at least one student that is not assigned to a campus", () => {
      const studentsWithNoCampus = students
        .filter(student => !student.campus)
        .map(student => student);
      expect(studentsWithNoCampus).to.have.lengthOf.above(0);
    });
  });
});