import React, { Component } from 'react'
import {createCampus} from '../redux/campuses'
import {connect} from 'react-redux'

class CreateCampus extends Component {
    constructor() {
        super();
        this.state = { 
          name: '',
          address: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }
      // upon submit, add the campus
      handleSubmit(evt) {
        evt.preventDefault();
        this.props.createCampus({ ...this.state });
      }

      
    render() {
        const {name, address} = this.state
        const { handleSubmit, handleChange } = this;
        return (
            <form id='campus-form' onSubmit={handleSubmit}>
              <label htmlFor='name'>Campus Name:
              {
                !name && <span className = 'warning'> Field is required</span>
              }
              </label>
              <input name='name' onChange={handleChange} value={name} />
      
              <label htmlFor='address'>Campus Address:
              {
                !address && <span className = 'warning'> Field is required </span>
              }
              </label>
              <input name='address' onChange={handleChange} value={address} />
      
              <button type='submit'>Submit</button>
            </form>
          );
    }
}

const mapDispatchToProps = (dispatch) => ({
    createCampus: (campus) => dispatch(createCampus(campus))
  });
  
  export default connect(null, mapDispatchToProps)(CreateCampus);
