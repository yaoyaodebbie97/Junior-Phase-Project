import React from 'react';

const NotFound = (props) => {
  return (
    <p>
    <div>The page at {props.location.pathname} does not exist!</div>
    <p> Please try again!</p>
    </p>
  )
}

export default NotFound