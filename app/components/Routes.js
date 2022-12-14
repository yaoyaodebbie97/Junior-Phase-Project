import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import AllCampuses from './AllCampuses'
import AllStudents  from './AllStudents'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'
import NotFound from './NotFound';


const Routes = () => {
  return (
    <Router>
      <div>
        <nav>Welcome!
        <ul>
          <Link to='/'>Home</Link>
          <Link to='/campuses'>Campuses</Link>
          <Link to='/students'>Students</Link>
        </ul>
        </nav>
        <main>
          <Switch>
          <Route exact
                path='/'
                render={() => {
                  return (
                    <div className='home'>
                      <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
                    </div>
                  )
                }}
              />
            <Route exact path = '/campuses'  component= {AllCampuses}/>
            <Route exact path = '/campuses/:campusId' component= {SingleCampus} />
            <Route exact path = '/students' component= {AllStudents} />
            <Route exact path = '/students/:studentId' component= {SingleStudent} />
            <Route component={NotFound} />
          </Switch> 
        </main>
      </div>
    </Router>
  );
};

export default Routes;


// <main>
// <Route exact path = '/campuses'  component= {AllCampuses}/>
// <Route path = '/campuses/:campusId' component= {SingleCampus} />
// <Route exact path = '/students' component= {AllStudents} />
// <Route path = '/students/:studentId' component= {SingleStudent} />
// <Route exact
//     path='/'
//     render={() => {
//       return (
//         <div className='home'>
//           <h1>Welcome to the Margaret Hamilton Academy of JavaScript!</h1>
//         </div>
//       )
//     }}
//   />
// </main>