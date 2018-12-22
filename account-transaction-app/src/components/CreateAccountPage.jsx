import React from "react";
import http from "axios";

class CreateAccountPage extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    accountNo: "",
    balance: "",
    mobileNo: "",
    email: "",
    isAccountExist: undefined,
    isMobileValid: undefined,
    isEmailValid: undefined
    //isMobileNoExist: false
  };

  baseUrl = "http://localhost:5000/api/accounts";

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleChangeMobile = event => {
    const { value } = event.target;
    const pattern = /^\+?(?:[0-9]●?){10,14}[0-9]$/g;
    const isMobileValid = pattern.test(value);
    this.setState({
      mobileNo: value,
      isMobileValid
    });
  };

  handleChangeEmail = event => {
    const { value } = event.target;
    const pattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/g;
    const isEmailValid = pattern.test(value);
    console.log(isEmailValid);
    this.setState({
      email: value,
      isEmailValid
    });
  };

  handleValidateForm = () => {
    const {
      isEmailValid,
      isMobileValid,
      isAccountExist 
    } = this.state;
    if (!isEmailValid || !isMobileValid || isAccountExist )
      return false;
    return true;
  };

  handleRequiredFields = () => {
    const { firstName, lastName, mobileNo, email, balance } = this.state;
    if (!firstName || !lastName || !mobileNo || !balance || !email)
      return false;
    return true;
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (!this.handleRequiredFields()) {
      alert("Empty Fields are Required! Try again.");
      return;
    }
    if (!this.handleValidateForm()) {
      alert("Invalid Data Are Not Allowed. Try Again.");
      return;
    }

    const {
      firstName,
      lastName,
      mobileNo,
      email,
      balance,
      accountNo
    } = this.state;
    //const accountNo = `@${firstName}${mobileNo}@%`;
    const data = { firstName, lastName, accountNo, mobileNo, email, balance };
    const response = await http.post(this.baseUrl, data);
    console.log(response.data);
    if (response.status === 201) {
      this.props.history.push("/accountIndexPage");
    }
  };

  handleIsAccountExist = async () => {
    const { accountNo } = this.state;
    const response = await http.get(
      `${this.baseUrl}/check/account/${accountNo}`
    );
    if (response.status === 200) {
      const { isExist: isAccountExist } = response.data;
      this.setState({ isAccountExist });
    }
  };

  // handleExistMobileNo = async () => {
  //   const { mobileNo } = this.state;
  //   const response = await http.get(`${this.baseUrl}/check/mobile/${mobileNo}`);
  //   if (response.status === 200) {
  //     console.log(response.data);
  //     const { isExist: isMobileNoExist } = response.data;
  //     this.setState({ isMobileNoExist });
  //   }
  // };

  render() {
    const {
      firstName,
      lastName,
      mobileNo,
      email,
      accountNo,
      balance,
      isEmailValid,
      isMobileValid,
      isAccountExist 
    } = this.state;
    return (
      <div className="card-body border minHeight">
        <div className="offset-2 col-sm-8">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="firstName" className="col-sm-4 col-form-label">
                First Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  placeholder="FirstName"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="lastName" className="col-sm-4 col-form-label">
                Last Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  placeholder="LastName"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="mobileNo" className="col-sm-4 col-form-label">
                Mobile No.
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="mobileNo"
                  name="mobileNo"
                  value={mobileNo}
                  placeholder=""
                  onBlur={this.handleExistMobileNo}
                  onChange={this.handleChangeMobile}
                />
                {/* {isMobileNoExist && (
                  <span className="text-danger">
                    This Mobile No. is Already Exist! Try Again.
                  </span>
                )} */}
                {isMobileValid === false && (
                  <span className="text-danger">
                    Invalid Mobile No. (like-01****79339)
                  </span>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="mobileNo" className="col-sm-4 col-form-label">
                Email
              </label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  placeholder=""
                  onChange={this.handleChangeEmail}
                />
                {isEmailValid === false && (
                  <span className="text-danger">
                    Invalid Email.(Ex - name@gmail.com)
                  </span>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="accountNo" className="col-sm-4 col-form-label">
                A/C No.
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="accountNo"
                  name="accountNo"
                  value={accountNo}
                  placeholder=" A/C No."
                  onBlur={this.handleIsAccountExist}
                  onChange={this.handleChange}
                />
                {isAccountExist && (
                  <span className="text-danger">
                    Account Number is already exist!
                  </span>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="balance" className="col-sm-4 col-form-label">
                Balance
              </label>
              <div className="col-sm-8">
                <input
                  type="number"
                  className="form-control"
                  id="balance"
                  name="balance"
                  value={balance}
                  placeholder="Balance"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-4" />
              <div className="col-sm-8">
                <button
                  className="btn  btn-primary"
                  type="submit"
                  disabled={isAccountExist}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default CreateAccountPage;
