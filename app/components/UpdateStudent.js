import React, { Component } from 'react'
import { connect } from 'react-redux';
import {setSingleStudent, updateStudent} from '../redux/singleStudent'


class UpdateStudent extends Component {
    constructor() {
        super();
        this.state = { 
          firstName: '',
          lastName: '',
          email: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidUpdate(prevProps) {
        if (prevProps.student.id !== this.props.student.id) {
          this.setState({
            firstName: this.props.student.firstName ||'',
            lastName: this.props.student.lastName ||'',
            email: this.props.student.email || ''
          });
        }
      }
      componentWillUnmount() { // form will pre populate each time 
        this.props.clearStudent();
      }
      
    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }

      handleSubmit(evt) {
        evt.preventDefault();
        this.props.updateStudent({...this.props.student, ...this.state });
      }

      
    render() {
        const {firstName, lastName, email} = this.state
        const { handleSubmit, handleChange } = this;
        return (
            <form id='student-form' onSubmit={handleSubmit}>
            <label htmlFor='firstName'>First Name:</label>
            <input name='firstName' onChange={handleChange} value={firstName} />

            <label htmlFor='lastName'>Last Name:</label>
            <input name='lastName' onChange={handleChange} value={lastName} />

            <label htmlFor='email'>Email Address:</label>
            <input name='email' onChange={handleChange} value={email} />
    
            <button type='submit'>Submit the Update</button>
          </form>
          );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateStudent: (student) => dispatch(updateStudent(student)),
    clearStudent: () => dispatch(setSingleStudent({})),
  });
  
  export default connect(null, mapDispatchToProps)(UpdateStudent);
