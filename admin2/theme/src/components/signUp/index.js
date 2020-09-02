import React from 'react';
import Modal from 'react-responsive-modal';
import apiClient from '../../lib/apiClient'

export default class SignUp extends React.Component {
  state = {
    full_name:'',
    email: '',
    password: '',
    validate:false,
    errMsg:'',
    successMsg:'',
    isRequesting: false
  }

  render() {
    const {open, onClose} = this.props
    const {full_name, email, password, validate, errMsg, successMsg, isRequesting} = this.state

    return (
      <div>
        <Modal open={open} onClose={onClose} center showCloseIcon={false}>
          <div className="form-wrap">
            <h2>Sign Up</h2>
            {errMsg.length > 0 && <p className="error-msg"> {errMsg}</p>}
            {successMsg.length > 0 && <p className="success-msg"> {successMsg}</p>}
            <div className="input-wrap">
              <label>Full Name</label>
              <input type="text" value={full_name} onChange={(event)=>this.setState({full_name: event.target.value})}/>
              {validate && full_name.length == 0 && <span>Please enter full name</span>}
            </div>

            <div className="input-wrap">
              <label>E-mail</label>
              <input type="text" value={email} onChange={(event)=>this.setState({email: event.target.value})}/>
              {validate && email.length == 0 && <span>Please enter email</span>}
            </div>
            <div className="input-wrap">
              <label>Password</label>
              <input type="password" value={password} onChange={(event)=>this.setState({password: event.target.value})}/>
              {validate && password.length == 0 && <span>Please enter password</span>}
            </div>

            <a onClick={this.signUp} disabled={isRequesting}>{isRequesting ? "Loading..." : "Sign Up"}</a>
          </div>
        </Modal>
      </div>
    );
  }

  signUp = ()=>{
    this.setState({validate: true, errMsg: ''})
    const {full_name, email, password, validate} = this.state
    if (full_name.length > 0 && email.length > 0 && password.length > 0) {
        this.setState({isRequesting: true})
        apiClient
        .post('/sign_up', {full_name, email, password })
        .then((response) => {
          if (response.statusCode == 200) {
            this.setState({isRequesting: false, full_name:'', email:'', password:'', validate: false, successMsg:'Thank you for your registration! Your account is now ready to use.'})
          }else{
            this.setState({isRequesting: false, errMsg: response.body.message})
          }
        })
        .catch((errMsg) => this.setState({errMsg: 'Can not connect server.', isRequesting: false}))
    }

  }
}
