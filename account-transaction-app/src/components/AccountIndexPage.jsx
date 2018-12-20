import React from 'react';
import http from 'axios';
import { NavLink } from 'react-router-dom';
import moment from 'moment'

class AccountIndexPage extends React.Component {
    state = {
        accounts: []
    };

    baseUrl = "http://localhost:5000/api";

    async componentDidMount() {

        const response = await http.get(`${this.baseUrl}/accounts/`);

        if (response.status === 200) { 
            const accounts = response.data; 
            this.setState({ accounts });
        }
    }; 

    render() {
        const { accounts } = this.state;
        return (
            <div className="card-body border minHeight">
                <div className="">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>MobileNo</th>
                                <th>Email</th> 
                                <th>A/C No.</th>
                                <th>Balance</th> 
                                <th>Tran.At</th>  
                                <th width="200">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account,index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>

                                <td>{`${account.firstName}${account.lastName}`}</td>
                                    <td>{account.mobileNo}</td>
                                    <td>{account.email}</td> 
                                    <td>{account.accountNo}</td>
                                    <td>{account.balance}</td> 
                                    <td>{moment(account.createdAt).format("DD-MM-YYYY hh:mm:ss a")}</td>  
                                    <td>
                                    {/* <NavLink to={`/account/edit/${account.id}`} className="btn btn-sm btn-warning ml-2">Edit</NavLink>
                                    <button className="btn btn-sm btn-danger ml-2" onClick={()=>this.handleDelete(account.id)}>Delete</button> */}
                                    <NavLink to={`/detailAccountPage/information/${account.id}`} className="btn btn-sm btn-info ml-2">Details</NavLink> 
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default AccountIndexPage;