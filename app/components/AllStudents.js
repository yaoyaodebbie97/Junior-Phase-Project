import React from "react";
import { connect } from "react-redux";
import {fetchStudents} from '../redux/students'
import {Link} from 'react-router-dom'



// Notice that we're exporting the AllStudents component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllStudents extends React.Component {
  componentDidMount() { 
    this.props.getStudents();
  }
  render() {
    return (
      <div>
        {this.props.students.length > 0 
        ? this.props.students.map (student =>(
          <Link to = {`students/${student.id}`} key = {student.id}>
          <h1> {`${student.firstName} ${student.lastName}`}</h1>
          </Link>
        ))
        : <h1>No Students</h1> 
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  students: state.students
});

const mapDispatch = (dispatch) => ({
  getStudents:() => dispatch(fetchStudents())
});

export default connect(mapState, mapDispatch)(AllStudents);
