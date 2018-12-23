import React from "react";
import http from "axios";

class AccountOperationPage extends React.Component {
  state = {
    accountId: "",
    transactionMode: "",
    amount: "",
    listofaccount: [],
    isInsufficientBalance: undefined
  };

  baseUrl = "http://localhost:5000/api";

  async componentDidMount() {
    const response = await http.get(`${this.baseUrl}/accounts`);
    if (response.status === 200) {
      const listofaccount = response.data;
      this.setState({ listofaccount });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    //console.log(this.state);
  };

  handleChangeAmount = event => {
    const { value } = event.target;
    this.setState({ amount: value, isInsufficientBalance: undefined });
  };

  handleInsufficiectAmount = async () => {
    const { accountId, amount } = this.state;
    if (!accountId || !amount) return;
    const response = await http.get(
      `${this.baseUrl}/accounts/check/balance/${accountId}/${amount}`
    );
    if (response.status === 200) {
      console.log(response.data);
      const { isInsufficient: isInsufficientBalance } = response.data;
      this.setState({ isInsufficientBalance });
    }
  };
  handleRequiredFields = () => {
    const { accountId, amount, transactionMode } = this.state;
    if (!accountId || !transactionMode || !amount) return false;
    return true;
  };

  handleValidAmount = () => {
    const { amount } = this.state;
    if (amount <= 0) return false;
    return true;
  };
  handleSubmit = async event => {
    event.preventDefault();
    const {
      accountId,
      amount,
      transactionMode,
      isInsufficientBalance
    } = this.state;
    if (!this.handleRequiredFields()) {
      alert("Empty Fields are Required!");
      return;
    }
    if (isInsufficientBalance) {
      alert("Invalid Data are not Allowed!");
      return;
    }
    if (!this.handleValidAmount()) {
      alert("Invalid Amount!");
      return;
    }
    if (amount <= 0) return;
    const response = await http.post(`${this.baseUrl}/transactions`, {
      accountId,
      transactionMode,
      amount
    });

    if (response.status === 200) {
      console.log(response.status);
      this.props.history.push("/allTransactionPage");
    }
  };
  render() {
    const {
      listofaccount,
      accountId,
      amount,
      transactionMode,
      isInsufficientBalance
    } = this.state;
    return (
      <div className="card-body border minHeight">
        <div className="offset-2 col-sm-8">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="accountId" className="col-sm-4 col-form-label">
                A/C No.
              </label>
              <div className="col-sm-8">
                <select
                  name="accountId"
                  id="accountId"
                  className="form-control"
                  value={accountId}
                  onChange={this.handleChange}
                >
                  <option>--Select--</option>
                  {listofaccount.map((account, index) => (
                    <option key={index} value={account.id}>
                      {account.accountNo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lname" className="col-sm-4 col-form-label">
                Transaction Mode
              </label>
              <div className="col-sm-8">
                <select
                  name="transactionMode"
                  id="transactionMode"
                  className="form-control"
                  value={transactionMode}
                  onChange={this.handleChange}
                >
                  <option>--Select--</option>
                  <option value="dr">Receive</option>
                  <option value="cr">Payment</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="amount" className="col-sm-4 col-form-label">
                Amount
              </label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={amount}
                  placeholder=""
                  onBlur={this.handleInsufficiectAmount}
                  onChange={this.handleChangeAmount}
                />
                {isInsufficientBalance && (
                  <span className="text-danger">Insufficient Balance!</span>
                )}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4" />
              <div className="col-sm-8">
                <button
                  className="btn  btn-primary"
                  type="submit"
                  disabled={isInsufficientBalance}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default AccountOperationPage;
