import React from "react";
import { connect } from "react-redux";
import {fetchCampuses} from '../redux/campuses'
import {Link} from 'react-router-dom'


// Notice that we're exporting the AllCampuses component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllCampuses extends React.Component {
  componentDidMount() { 
    this.props.getCampuses();
  }
  render() {
    return (
      <div>
        {/* {console.log(this.props.campuses)} */}
        {this.props.campuses.length > 0 
          ? this.props.campuses.map (campus => (
          <Link to = {`/campuses/${campus.id}`} key = {campus.id}>
            <div> 
            <h1> name: {campus.name}</h1> 
            <img src = {campus.imageUrl}></img>  
            </div>
          </Link>
        ))
        : <h1> No Campuses </h1>
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  campuses: state.campuses
});

const mapDispatch = (dispatch) => ({
  getCampuses: () => dispatch (fetchCampuses())
});

export default connect(mapState, mapDispatch)(AllCampuses);
