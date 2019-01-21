import React, { Component } from "react";
// import moment from "moment";
import PropTypes from "prop-types";

export default class Records extends Component {
  render() {
    return (
      <tr>
        {/* <td>{moment(this.props.date).format("YYYY-MM-DD HH:mm:ss")}</td> */}
        <td>{this.props.date}</td>
        <td>{this.props.title}</td>
        <td>{this.props.amount}</td>
      </tr>
    );
  }
}

Records.propTypes = {
  id: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
};
