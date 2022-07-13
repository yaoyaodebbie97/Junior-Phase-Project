import React, { Component } from 'react'
import { connect } from "react-redux";
import {fetchSingleCampus} from '../redux/singleCampus'
import {Link} from 'react-router-dom'

// do we need to error handling for invalid campus id?
class SingleCampus extends Component {
    componentDidMount() { 
        this.props.getSingleCampus(this.props.match.params.campusId);
      }
    render() {
        const campus = this.props.campus
        const students = campus.Students || []
        return (
        <div>
            <p> name: {campus.name} </p>
            <img src = {campus.imageUrl} ></img>  
            <p> address: {campus.address}</p>
            <p> description: {campus.description} </p>
            <ul> students: {students.length > 0
                ? campus.Students.map (student => 
                  <Link to = {`/students/${student.id}`}>
                   <li key = {student.id}> {student.firstName + ' '+ student.lastName}</li>
                  </Link>)
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
    getSingleCampus: (id) => dispatch (fetchSingleCampus(id))
  });
  
  export default connect(mapState, mapDispatch)(SingleCampus);
  