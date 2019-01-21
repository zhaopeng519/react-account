import React, { Component } from "react";
import Record from "./Record";
// import $ from "jquery";
import axios from "axios";

export default class Records extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    // ---------------------jquery请求方法---------------------------
    // $.getJSON("http://5bd9c81a0bab79001346a054.mockapi.io/api/v1/records").then(
    //   response => this.setState({
    //       records: response,
    //       isLoaded:true
    //     }),
    //   error => this.setState({
    //       isLoaded:true,
    //       error
    //   })
    // );
    //--------------------------------------------------------------------

    axios
      .get(" http://localhost:4000/records")
      .then(response =>
        this.setState({
          records: response.data,
          isLoaded: true
        })
      )
      .catch(error =>
        this.setState({
          isLoaded: true,
          error
        })
      );
  }

  render() {
    const { error, isLoaded, records } = this.state;
    if (error) {
      return <div>Error:{error.responseText}</div>;
    } else if (!isLoaded) {
      return <div>Loading</div>;
    } else {
      return (
        <div>
          <h2>Records</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.records.map((record) => <Record record={record} key={record.id}/>)} */}
              {records.map(record => (
                <Record {...record} key={record.id} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
