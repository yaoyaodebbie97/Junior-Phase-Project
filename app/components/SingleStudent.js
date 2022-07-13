import React, { Component } from 'react'
import { connect } from "react-redux";
import {fetchSingleStudent} from '../redux/singleStudent'
import {Link} from 'react-router-dom'
import UpdateStudent from './UpdateStudent'

class SingleStudent extends Component {
    componentDidMount() { 
        this.props.getSingleStudent(this.props.match.params.studentId);
      }
    render() {
        const student = this.props.student
        const campus = student.Campus || {}
        return (
        <div>
            <UpdateStudent student = {student}/>
            <p> name: {student.firstName + ' ' + student.lastName} </p>
            <img src = {student.imageUrl} ></img>  
            <p> email: {student.email}</p>
            <p> gpa: {student.gpa} </p>
            <p> campus: {Object.keys(campus).length > 0
                ?  <Link to = {`/campuses/${campus.id}`}> { campus.name}</Link>
                : "This student doesn't belong to any campus"
                }
            </p>
        </div>
        )
  }
}

const mapState = (state) => ({
    student: state.singleStudent
  });
  
  const mapDispatch = (dispatch) => ({
    getSingleStudent: (id) => dispatch (fetchSingleStudent(id))
  });
  
  export default connect(mapState, mapDispatch)(SingleStudent);
  