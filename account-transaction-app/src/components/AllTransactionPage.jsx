import React from "react";
import http from "axios";
import moment from 'moment';
class AllTransactionsPage extends React.Component {
  state = {
    listofTransactions: []
  };

  baseUrl = "http://localhost:5000/api/transactions";

  async componentDidMount() {
    const response = await http.get(`${this.baseUrl}`); 
    if (response.status === 200) {
      const listofTransactions = response.data;
      console.log(listofTransactions);
      this.setState({ listofTransactions });
    }
  }

  render() {
    const { listofTransactions } = this.state;
    return (
      <div className="offset-1 col-sm-10 minHeight marginTop">
        {/* <div className="card d-flex justify-content-between">
          <div className="col-sm">
            <input type="text" name="searchValue" className="form-control" />
          </div>
          <div className="col-sm">
            <input type="date" name="searchValue" className="form-control" />
          </div>
          <div className="col-sm">
            <input type="date" name="searchValue" className="form-control" />
          </div>
        </div> */}
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
            <th>#</th> 
              <th>A/C No.</th>
              <th>Payment Trn.</th>
              <th>Receive Trn.</th>
              <th>Current Balance</th>
              <th>Transaction At</th>
            </tr>
          </thead>
          <tbody>
            {listofTransactions.map((transaction, index) => (
              <tr key={index}>
              <td>{index+1}</td>
                <td>{transaction.accountNo}</td>
                <td>{transaction.paymentAmount}</td>
                <td>{transaction.receiveAmount}</td>
                <td>{transaction.currentBalance}</td>
                <td>{moment(transaction.txnDateTime).format("DD-MM-YYYY hh:mm:ss a")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default AllTransactionsPage;