import React, { Component } from 'react'
import {createStudent} from '../redux/students'
import {connect} from 'react-redux'

class CreateStudent extends Component {
    constructor() {
        super();
        this.state = { 
          firstName: '',
          lastName: '',
          email: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }

      handleSubmit(evt) {
        evt.preventDefault();
        this.props.createStudent({ ...this.state });
      }

      
    render() {
        const {firstName, lastName, email} = this.state
        const { handleSubmit, handleChange } = this;
        return (
            <form id='student-form' onSubmit={handleSubmit}>
              <label htmlFor='firstName'>First Name:
              {
                !firstName && <span className = 'warning'> Field is required</span>
              }
              </label>
              <input name='firstName' onChange={handleChange} value={firstName} />

              <label htmlFor='lastName'>Last Name:
              {
                !lastName && <span className = 'warning'> Field is required</span>
              }
              </label>
              <input name='lastName' onChange={handleChange} value={lastName} />

              <label htmlFor='email'>Email Address:
              {
                !email && <span className = 'warning'> Field is required</span>
              }
              </label>
              <input name='email' onChange={handleChange} value={email} />
      
              <button type='submit'>Submit</button>
            </form>
          );
    }
}

const mapDispatchToProps = (dispatch) => ({
    createStudent: (student) => dispatch(createStudent(student))
  });
  
  export default connect(null, mapDispatchToProps)(CreateStudent);
