import React, { Component } from "react";
import moment from "moment"; 
export default class Records extends Component {
  render() {
    return <tr>
        <td>{moment(this.props.date).format("YYYY-MM-DD HH:mm:ss")}</td>
        <td>{this.props.title}</td>
        <td>{this.props.amount}</td>
      </tr>;
  }
}
