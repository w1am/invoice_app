import React from "react";
import { Redirect } from 'react-router-dom';

class Signout extends React.Component {
  render() {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    return <Redirect to='/bye' />
  }
}

export default Signout;