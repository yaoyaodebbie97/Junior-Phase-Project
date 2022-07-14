import React, { Component } from 'react'
import { connect } from 'react-redux';
import {setSingleCampus, updateCampus} from '../redux/singleCampus'


class UpdateCampus extends Component {
    constructor() {
        super();
        this.state = { 
          name: '',
          address: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.campus.id !== this.props.campus.id) {
          this.setState({
            name: this.props.campus.name ||'',
            address: this.props.campus.address || ''
          });
        }
      }
      componentWillUnmount() { // form will pre populate each time 
        this.props.clearCampus();
      }
      
    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }

      handleSubmit(evt) {
        evt.preventDefault();
        this.props.updateCampus({...this.props.campus, ...this.state });
      }

      
    render() {
        // console.log(this.props) // have a campus prop
        const {name, address} = this.state
        const { handleSubmit, handleChange } = this;
        return (
            <form id='campus-form' onSubmit={handleSubmit}>
              <label htmlFor='name'>Campus Name:</label>
              <input name='name' onChange={handleChange} value={name} />
      
              <label htmlFor='address'>Campus Address:</label>
              <input name='address' onChange={handleChange} value={address} />
      
              <button type='submit'>Submit the Update</button>
            </form>
          );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCampus: (campus) => dispatch(updateCampus(campus)),
    clearCampus: () => dispatch(setSingleCampus({})),
  });
  
  export default connect(null, mapDispatchToProps)(UpdateCampus);
