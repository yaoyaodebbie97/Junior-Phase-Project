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
  campuses: []
};

import mockAxios from "../mock-axios";
import { setCampuses, fetchCampuses } from "../../app/redux/campuses";

import store from "../../app/store";

import rootReducer from "../../app/redux";
import { createStore } from "redux";

const app = require("../../server");
const agent = require("supertest")(app);

const { db, Campus } = require("../../server/db");

const seed = require("../../seed");

// NOTE: Make sure you pay attention to the path below. This is where your React components should live!
// AllCampuses is the default export from that module, and it is connected to Redux.
// UnconnectedAllCampuses is a named export from that module, and it is NOT connected
// to Redux. We're testing BOTH of these components in here.
import AllCampuses, {
  AllCampuses as UnconnectedAllCampuses
} from "../../app/components/AllCampuses";
import AllStudents from "../../app/components/AllStudents";
import Routes from "../../app/components/Routes";

describe("Tier One: Campuses", () => {
  // We'll use this array of campuses as dummy data for testing purposes
  const campuses = [
    {
      id: 1,
      name: "Mars Academy",
      imageUrl: "/images/mars.png"
    },
    {
      id: 2,
      name: "Jupiter Jumpstart",
      imageUrl: "/images/jupiter.jpeg"
    }
  ];
  beforeEach(() => {
    // mockAxios ensures that when our client-side code requests data from the
    // server, the request is always successful (even if we haven't implemented)
    // our server yet.
    mockAxios.onGet("/api/campuses").replyOnce(200, campuses);
  });
  describe("<AllCampuses /> component", () => {
    const getCampusesSpy = sinon.spy();
    afterEach(() => {
      getCampusesSpy.resetHistory();
    });

    // This test is interested in the unconnected AllCampuses component. It is
    // exported as a named export in app/components/AllCampuses.js
    xit("renders the campuses passed in as props", () => {
      const wrapper = mount(
        <MemoryRouter>
          <UnconnectedAllCampuses
            campuses={campuses}
            getCampuses={getCampusesSpy}
          />
        </MemoryRouter>
      );
      expect(wrapper.text()).to.include("Mars Academy");
      expect(wrapper.text()).to.include("Jupiter Jumpstart");
      // The test is expecting an image for each campus, with src set to the
      // campus's imageUrl
      const images = wrapper.find("img").map(node => node.get(0).props.src);
      expect(images).to.include.members([
        "/images/mars.png",
        "/images/jupiter.jpeg"
      ]);
    });

    xit("renders DIFFERENT campuses passed in as props", () => {
      const differentCampuses = [
        {
          id: 3,
          name: "Pluto Conservatory",
          imageUrl: "/images/pluto.png"
        },
        {
          id: 4,
          name: "Art Institute of Mercury",
          imageUrl: "/images/mercury.png"
        }
      ];
      const wrapper = mount(
        <MemoryRouter>
          <UnconnectedAllCampuses
            campuses={differentCampuses}
            getCampuses={getCampusesSpy}
          />
        </MemoryRouter>
      );
      expect(wrapper.text()).to.not.include("Mars Academy");
      expect(wrapper.text()).to.not.include("Jupiter Jumpstart");
      expect(wrapper.text()).to.include("Pluto Conservatory");
      expect(wrapper.text()).to.include("Art Institute of Mercury");
      // The test is expecting an image for each campus, with src set to the
      // campus's imageUrl
      const images = wrapper.find("img").map(node => node.get(0).props.src);
      expect(images).to.include.members([
        "/images/pluto.png",
        "/images/mercury.png"
      ]);
    });

    xit('*** renders "No Campuses" if passed an empty array of campuses', () => {
      throw new Error("replace this error with your own test");
    });

    // In a later step, we'll create a thunk, and map that thunk to AllCampuses
    // as getCampuses. For right now, we just need to be sure the component
    // calls it after it mounts.
    xit("calls this.props.getCampuses after mount", async () => {
      mount(
        <MemoryRouter>
          <UnconnectedAllCampuses
            campuses={campuses}
            getCampuses={getCampusesSpy}
          />
        </MemoryRouter>
      );
      await waitForExpect(() => {
        expect(getCampusesSpy).to.have.been.called;
      });
    });
  });

  describe("Redux", () => {
    let fakeStore;
    beforeEach(() => {
      fakeStore = mockStore(initialState);
    });

    // Check out app/redux/campuses.js for these two tests
    describe("set/fetch campuses", () => {
      xit("setCampuses action creator returns a valid action", () => {
        expect(setCampuses(campuses)).to.deep.equal({
          type: "SET_CAMPUSES",
          campuses
        });
      });

      xit("fetchCampuses thunk creator returns a thunk that GETs /api/campuses", async () => {
        await fakeStore.dispatch(fetchCampuses());
        const [getRequest] = mockAxios.history.get;
        expect(getRequest).to.not.equal(undefined);
        expect(getRequest.url).to.equal("/api/campuses");
        const actions = fakeStore.getActions();
        expect(actions[0].type).to.equal("SET_CAMPUSES");
        expect(actions[0].campuses).to.deep.equal(campuses);
      });
    });

    describe("reducer", () => {
      let testStore;
      beforeEach(() => {
        testStore = createStore(rootReducer);
      });

      xit("*** returns the initial state by default", () => {
        throw new Error("replace this error with your own test");
      });

      xit("reduces on SET_CAMPUSES action", () => {
        const action = { type: "SET_CAMPUSES", campuses };

        const prevState = testStore.getState();
        testStore.dispatch(action);
        const newState = testStore.getState();

        expect(newState.campuses).to.be.deep.equal(campuses);
        expect(newState.campuses).to.not.be.equal(prevState.campuses);
      });
    });
  });

  describe("Connect: react-redux", () => {
    // This test is expecting your component to dispatch a thunk after it mounts
    // Remember that getCampuses prop from an earlier test? Now's a good time
    // for a mapDispatch.
    xit("initializes campuses from the server when the application loads the /campuses route", async () => {
      const reduxStateBeforeMount = store.getState();
      expect(reduxStateBeforeMount.campuses).to.deep.equal([]);
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/campuses"]}>
            <AllCampuses />
          </MemoryRouter>
        </Provider>
      );
      await waitForExpect(() => {
        const reduxStateAfterMount = store.getState();
        expect(reduxStateAfterMount.campuses).to.deep.equal(campuses);
      });
    });

    // This test is expecting your component to render the campuses from the
    // Redux store.  Now's a good time for a mapState.
    xit("<AllCampuses /> renders campuses from the Redux store", async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/campuses"]}>
            <AllCampuses />
          </MemoryRouter>
        </Provider>
      );
      await waitForExpect(() => {
        wrapper.update();

        const { campuses: reduxCampuses } = store.getState();
        reduxCampuses.forEach(reduxCampus => {
          expect(wrapper.text()).to.include(reduxCampus.name);
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

    // This test expects that you've set up a Route for AllCampuses.
    // You should take a look at app/components/Routes.js
    xit("renders <AllCampuses /> at /campuses", () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/campuses"]}>
            <Routes />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(AllCampuses)).to.have.length(1);
      expect(wrapper.find(AllStudents)).to.have.length(0);
    });

    xit('*** navbar has links to "/campuses" and "/" (homepage)', () => {
      throw new Error("replace this error with your own test");
    });
  });

  describe("Express API", () => {
    // Let's test our Express routes WITHOUT actually using the database.
    // By replacing the findAll methods on our Sequelize models with a spy,
    // we can ensure that our API tests won't fail just because
    // our Sequelize models haven't been implemented yet.
    const { findAll: campusFindAll } = Campus;
    beforeEach(() => {
      Campus.findAll = sinon.spy(() => campuses);
    });
    afterEach(() => {
      Campus.findAll = campusFindAll;
    });

    // Consider writing your GET route in server/api/campuses.js. And don't
    // forget to apply the express router to your API in server/api/index.js!
    xit("GET /api/campuses responds with all campuses", async () => {
      const response = await agent.get("/api/campuses").expect(200);
      expect(response.body).to.deep.equal([
        {
          id: 1,
          name: "Mars Academy",
          imageUrl: "/images/mars.png"
        },
        {
          id: 2,
          name: "Jupiter Jumpstart",
          imageUrl: "/images/jupiter.jpeg"
        }
      ]);
      expect(Campus.findAll.calledOnce).to.be.equal(true);
    });
  });

  describe("Sequelize Model", () => {
    before(() => db.sync({ force: true }));
    afterEach(() => db.sync({ force: true }));

    xit("has fields name, address, imageUrl, description", async () => {
      const campus = await Campus.create({
        name: "Jupiter Jumpstart",
        address: "5.2 AU",
        imageUrl: "/images/jupiter.png",
        description:
          "The best JavaScript Academy for toddlers in the solar system!"
      });
      expect(campus.name).to.equal("Jupiter Jumpstart");
      expect(campus.address).to.equal("5.2 AU");
      expect(campus.imageUrl).to.equal("/images/jupiter.png");
      expect(campus.description).to.equal(
        "The best JavaScript Academy for toddlers in the solar system!"
      );
    });

    xit("*** requires name and address", async () => {
      throw new Error("replace this error with your own test");
    });

    xit("name and address cannot be empty", async () => {
      const campus = Campus.build({ name: "", address: "" });
      try {
        await campus.validate();
        throw Error(
          "validation should have failed with empty name and address"
        );
      } catch (err) {
        expect(err.message).to.contain("Validation notEmpty on name");
        expect(err.message).to.contain("Validation notEmpty on address");
      }
    });

    xit("default imageUrl if left blank", async () => {
      const campus = Campus.build({
        name: "Jupiter Jumpstart",
        address: "5.2 AU"
      });
      await campus.validate();
      expect(campus.imageUrl).to.be.a("string");
      expect(campus.imageUrl.length).to.be.greaterThan(1);
    });
  });

  describe("Seed file", () => {
    beforeEach(seed);

    xit("populates the database with at least three campuses", async () => {
      const seededCampuses = await Campus.findAll();
      expect(seededCampuses).to.have.lengthOf.at.least(3);
    });
  });
});
