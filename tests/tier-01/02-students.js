/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";
import React from "react";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import waitForExpect from "wait-for-expect";
import { Provider } from "react-redux";
import * as rrd from "react-router-dom";

const { MemoryRouter } = rrd;

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
const initialState = {
  students: []
};

import mockAxios from "../mock-axios";
import { setStudents, fetchStudents } from "../../app/redux/students";

import store from "../../app/store";

import rootReducer from "../../app/redux";
import { createStore } from "redux";

const app = require("../../server");
const agent = require("supertest")(app);

const { db, Student } = require("../../server/db");

const seed = require("../../seed");

// NOTE: Make sure you pay attention to the path below. This is where your React components should live!
// AllStudents is the default export from that module, and it is connected to Redux.
// UnconnectedAllStudents is a named export from that module, and it is NOT connected
// to Redux. We're testing BOTH of these components in here.
import AllStudents, {
  AllStudents as UnconnectedAllStudents
} from "../../app/components/AllStudents";
import AllCampuses from "../../app/components/AllCampuses";
import Routes from "../../app/components/Routes";

describe("Tier One: Students", () => {
  // We'll use this array of students as dummy data for testing purposes
  const students = [
    {
      id: 1,
      firstName: "Mae",
      lastName: "Jemison"
    },
    {
      id: 2,
      firstName: "Sally",
      lastName: "Ride"
    }
  ];
  beforeEach(() => {
    // mockAxios ensures that when our client-side code requests data from the
    // server, the request is always successful (even if we haven't implemented)
    // our server yet.
    mockAxios.onGet("/api/students").replyOnce(200, students);
  });
  describe("<AllStudents /> component", () => {
    const getStudentsSpy = sinon.spy();
    afterEach(() => {
      getStudentsSpy.resetHistory();
    });

    // This test is interested in the unconnected AllStudents component. It is
    // exported as a named export in app/components/AllStudents.js
    it("renders the students passed in as props", () => {
      const wrapper = mount(
        <MemoryRouter>
          <UnconnectedAllStudents
            students={students}
            getStudents={getStudentsSpy}
          />
        </MemoryRouter>
      );
      expect(wrapper.text()).to.include("Mae Jemison");
      expect(wrapper.text()).to.include("Sally Ride");
    });

    it("renders DIFFERENT students passed in as props", () => {
      const differentStudents = [
        {
          id: 3,
          firstName: "Mary",
          lastName: "Shelley"
        },
        {
          id: 4,
          firstName: "Ada",
          lastName: "Lovelace"
        }
      ];
      const wrapper = mount(
        <MemoryRouter>
          <UnconnectedAllStudents
            students={differentStudents}
            getStudents={getStudentsSpy}
          />
        </MemoryRouter>
      );
      expect(wrapper.text()).to.not.include("Mae Jemison");
      expect(wrapper.text()).to.not.include("Sally Ride");
      expect(wrapper.text()).to.include("Mary Shelley");
      expect(wrapper.text()).to.include("Ada Lovelace");
    });

    it('*** renders "No Students" if passed an empty array of students', () => {
      const differentStudents = [];
      const wrapper = mount(
        <MemoryRouter>
          <UnconnectedAllStudents
            students={differentStudents}
            getStudents={getStudentsSpy}
          />
        </MemoryRouter>
      );
      expect(wrapper.text()).to.include("No Students");
    });

    // In a later step, we'll create a thunk, and map that thunk to AllStudents
    // as getStudents. For right now, we just need to be sure the component
    // calls it after it mounts.
    it("calls this.props.getStudents after mount", async () => {
      mount(
        <MemoryRouter>
          <UnconnectedAllStudents
            students={students}
            getStudents={getStudentsSpy}
          />
        </MemoryRouter>
      );
      await waitForExpect(() => {
        expect(getStudentsSpy).to.have.been.called;
      });
    });
  });

  describe("Redux", () => {
    let fakeStore;
    beforeEach(() => {
      fakeStore = mockStore(initialState);
    });

    describe("set/fetch students", () => {
      it("setStudents action creator returns a valid action", () => {
        expect(setStudents(students)).to.deep.equal({
          type: "SET_STUDENTS",
          students
        });
      });

      it("fetchStudents thunk creator returns a thunk that GETs /api/students", async () => {
        await fakeStore.dispatch(fetchStudents());
        const [getRequest] = mockAxios.history.get;
        expect(getRequest).to.not.equal(undefined);
        expect(getRequest.url).to.equal("/api/students");
        const actions = fakeStore.getActions();
        expect(actions[0].type).to.equal("SET_STUDENTS");
        expect(actions[0].students).to.deep.equal(students);
      });
    });

    describe("reducer", () => {
      let testStore;
      beforeEach(() => {
        testStore = createStore(rootReducer);
      });

      it("*** returns the initial state by default", () => {
        const initialState = testStore.getState();
        // console.log(initialState)
        expect (testStore.getState().campuses).to.be.deep.equal([])      });

      it("reduces on SET_STUDENTS action", () => {
        const action = {
          type: "SET_STUDENTS",
          students
        };

        const prevState = testStore.getState();
        testStore.dispatch(action);
        const newState = testStore.getState();

        expect(newState.students).to.be.deep.equal(students);
        expect(newState.students).to.not.be.equal(prevState.students);
      });
    });
  });

  describe("Connect: react-redux", () => {
    // This tests is expecting your component to dispatch a thunk after it mounts
    // Remember that getStudents prop from an earlier test? Now's a good time
    // for a mapDispatch.
    it("initializes students from the server when the application loads the /students route", async () => {
      const reduxStateBeforeMount = store.getState();
      expect(reduxStateBeforeMount.students).to.deep.equal([]);
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/students"]}>
            <AllStudents />
          </MemoryRouter>
        </Provider>
      );
      await waitForExpect(() => {
        const reduxStateAfterMount = store.getState();
        expect(reduxStateAfterMount.students).to.deep.equal(students);
      });
    });

    // This test is expecting your component to render the students from the
    // Redux store. Now's a good time for a mapState.
    it("<AllStudents /> renders students from the Redux store", async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/students"]}>
            <AllStudents />
          </MemoryRouter>
        </Provider>
      );
      await waitForExpect(() => {
        wrapper.update();

        const { students: reduxStudents } = store.getState();
        reduxStudents.forEach(reduxStudent => {
          expect(wrapper.text()).to.include(reduxStudent.firstName);
        });
      });
    });
  });

  describe("Navigation", () => {
    beforeEach(() => {
      sinon.stub(rrd, "BrowserRouter").callsFake(({ children }) => {
        return <div>{children}</div>;
      });
    });
    afterEach(() => {
      rrd.BrowserRouter.restore();
    });

    // This test expects that you've set up a Route for AllStudents
    it("renders <AllStudents /> at /students", () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/students"]}>
            <Routes />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(AllStudents)).to.have.length(1);
      expect(wrapper.find(AllCampuses)).to.have.length(0);
    });

    xit('*** navbar has a link to "/students"', () => {
      throw new Error("replace this error with your own test");
    });
  });

  describe("Express API", () => {
    // Let's test our Express routes WITHOUT actually using the database.
    // By replacing the findAll methods on our Sequelize models with a spy,
    // we can ensure that our API tests won't fail just because
    // our Sequelize models haven't been implemented yet.
    const { findAll: studentFindAll } = Student;
    beforeEach(() => {
      Student.findAll = sinon.spy(() => students);
    });
    afterEach(() => {
      Student.findAll = studentFindAll;
    });

    it("*** GET /api/students responds with all students", async () => {
      // throw new Error("replace this error with your own test");
      const response = await agent.get("/api/students").expect(200);
      expect(response.body).to.deep.equal([
        {
          id: 1,
          firstName: "Mae",
          lastName: "Jemison"
        },
        {
          id: 2,
          firstName: "Sally",
          lastName: "Ride"
        }
      ]);
      expect(Student.findAll.calledOnce).to.be.equal(true);
    });
  });

  describe("Sequelize Model", () => {
    before(() => db.sync({ force: true }));
    afterEach(() => db.sync({ force: true }));

    it("has fields firstName, lastName, email, imageUrl, gpa", async () => {
      const student = await Student.create({
        firstName: "Sally",
        lastName: "Ride",
        email: "sallyride@nasa.gov",
        imageUrl: "/images/sallyride.png",
        gpa: 3.8
      });
      expect(student.firstName).to.equal("Sally");
      expect(student.lastName).to.equal("Ride");
      expect(student.imageUrl).to.equal("/images/sallyride.png");
      expect(student.email).to.equal("sallyride@nasa.gov");
      expect(parseFloat(student.gpa)).to.equal(3.8);
    });

    it("requires firstName, lastName, email", async () => {
      const student = Student.build();
      try {
        await student.validate();
        throw Error(
          "validation should have failed without firstName, lastName, email"
        );
      } catch (err) {
        expect(err.message).to.contain("firstName cannot be null");
        expect(err.message).to.contain("lastName cannot be null");
        expect(err.message).to.contain("email cannot be null");
      }
    });

    it("firstName, lastName, email cannot be empty", async () => {
      const student = Student.build({
        firstName: "",
        lastName: "",
        email: ""
      });
      try {
        await student.validate();
        throw Error(
          "validation should have failed with empty name and address"
        );
      } catch (err) {
        expect(err.message).to.contain("Validation notEmpty on firstName");
        expect(err.message).to.contain("Validation notEmpty on lastName");
        expect(err.message).to.contain("Validation notEmpty on email");
      }
    });

    it("*** email must be a valid email", async () => {
      const student = Student.build ({
        firstName: "yao",
        lastName: "guo",
        email: "yaoyaodebbie",
        gpa: 3.9
      });
      try{
        await student.validate();
        throw Error ('validation should have failed with invalid email')
      } catch (err){
        expect(err.message).to.contain('Validation isEmail on email failed');
      }
    });

    it("gpa must be a float between 0.0 and 4.0", async () => {
      const student = {
        firstName: "Sally",
        lastName: "Ride",
        email: "sallyride@nasa.gov",
        gpa: 4.1
      };
      const overachiever = Student.build(student);
      try {
        await overachiever.save();
        throw Error("validation should have failed with too high gpa");
      } catch (err) {
        expect(err.message).to.contain("Validation max on gpa");
      }
      student.gpa = -1;
      const underachiever = Student.build(student);
      try {
        await underachiever.validate();
        throw Error("validation should have failed with too low gpa");
      } catch (err) {
        expect(err.message).to.contain("Validation min on gpa");
      }
    });

    it("default imageUrl if left blank", () => {
      const student = Student.build({
        firstName: "",
        lastName: "",
        email: ""
      });
      expect(student.imageUrl).to.be.a("string");
      expect(student.imageUrl.length).to.be.greaterThan(1);
    });
  });
  describe("Seed file", () => {
    beforeEach(seed);

    it("populates the database with at least four students", async () => {
      const seededStudents = await Student.findAll();
      expect(seededStudents).to.have.lengthOf.at.least(4);
    });
  });
});
