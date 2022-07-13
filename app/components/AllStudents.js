import React from "react";
import { connect } from "react-redux";
import {fetchStudents, deleteStudent} from '../redux/students'
import {Link} from 'react-router-dom'
import CreateStudent from './CreateStudent'



// Notice that we're exporting the AllStudents component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllStudents extends React.Component {
  componentDidMount() { 
    this.props.getStudents();
  }
  render() {
    // console.log(this.props.students)
    return (
      <div>
        <CreateStudent/>
        {this.props.students.length > 0 
        ? this.props.students.map (student =>(
          <div key = {student.id}> 
          <Link to = {`students/${student.id}`}>
          <h1> {`${student.firstName} ${student.lastName}`}</h1>
          </Link>
          <button
            className='remove'
            onClick={() => this.props.deleteStudent(student.id)}>
            X
            </button>
          </div> 
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
  getStudents:() => dispatch(fetchStudents()),
  deleteStudent: (id) => dispatch(deleteStudent(id))
});

export default connect(mapState, mapDispatch)(AllStudents);
