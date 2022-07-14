import React, { Component } from 'react'
import { connect } from "react-redux";
import {fetchSingleCampus, removeStudent} from '../redux/singleCampus'
import {Link} from 'react-router-dom'
import UpdateCampus from './UpdateCampus'



class SingleCampus extends Component {

    componentDidMount() { 
        this.props.getSingleCampus(this.props.match.params.campusId);
    }

    render() {
        const campus = this.props.campus
        const students = campus.Students || []
        // console.log(campus) campus.Students
        return (
        <div>
            <UpdateCampus campus = {campus} />
            <p> NAME: {campus.name} </p>
            <img src = {campus.imageUrl} ></img>  
            <p> ADDRESS: {campus.address}</p>
            <p> DESCRIPTION: {campus.description} </p>
            <ul> ALL STUDENTS: {students.length > 0
                ? campus.Students.map (student => 
                  <div key = {student.id}>
                  <Link to = {`/students/${student.id}`}>
                   <li> {student.firstName + ' '+ student.lastName}</li>
                  </Link>
                  <button
                   onClick={() => {
                    this.props.removeStudent(campus,student);
                    }}>
                  Unregister
                  </button>
                  </div> )
                : 'There is no student in this campus'
                }
            </ul>
           
        </div>
        )
  }
}

const mapState = (state) => ({
    campus: state.singleCampus
  });
  
  const mapDispatch = (dispatch) => ({
    getSingleCampus: (id) => dispatch (fetchSingleCampus(id)),
    removeStudent: (campus, student) => dispatch (removeStudent(campus, student)),
  });
  
  export default connect(mapState, mapDispatch)(SingleCampus);
