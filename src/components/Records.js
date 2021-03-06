import React, { Component } from "react";
import Record from "./Record";
// import $ from "jquery";
// import axios from "axios";
import RecordForm from "./RecordForm";
import * as RecordsAPI from "../utils/RecordsAPI";
import AmountBox from "../components/AmountBox";

export default class Records extends Component {
  constructor() {
    super();
    this.state = { records: [], isLoaded: false, error: null };
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

    // axios
    //   .get("http://localhost:4000/records")
    //   .then(response =>
    //     this.setState({
    //       records: response.data,
    //       isLoaded: true
    //     })
    //   )
    //   .catch(error =>
    //     this.setState({
    //       isLoaded: true,
    //       error
    //     })
    //   );

    // axios
    //   .get(`${RecordsAPI.api}/api/v1/records`)
    //   .then(response =>
    //     this.setState({
    //       records: response.data,
    //       isLoaded: true
    //     })
    //   )
    //   .catch(error => this.setState({ isLoaded: true, error }));

    RecordsAPI.getAll()
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

  addRecord(record) {
    this.setState({
      error: null,
      isLoaded: true,
      records: [...this.state.records, record]
    });
    console.log(this.state.records);
  }

  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        // This isn't the item we care about - keep it as-is
        return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return {
        ...item,
        ...data
      };
    });
    this.setState({ records: newRecords });
  }

  deleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter(
      (item, index) => index !== recordIndex
    );
    this.setState({ records: newRecords });
  }

  credits() {
    let credits = this.state.records.filter(record => {
      return record.amount >= 0;
    });

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }, 0);
  }

  debits() {
    let credits = this.state.records.filter(record => {
      return record.amount < 0;
    });

    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0);
    }, 0);
  }

  balance() {
    return this.credits() + this.debits();
  }
  render() {
    const { error, isLoaded, records } = this.state;
    let recordsComponent;

    if (error) {
      recordsComponent = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      recordsComponent = <div>Loading...</div>;
    } else {
      recordsComponent = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <Record
                key={record.id}
                record={record}
                handleEditRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)}
              />
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.credits()} />
          <AmountBox text="Debit" type="danger" amount={this.debits()} />
          <AmountBox text="Balance" type="info" amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsComponent}
      </div>
    );
  }
}
