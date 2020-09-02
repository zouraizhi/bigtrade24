import React from 'react';
import Modal from 'react-responsive-modal';
import apiClient from '../../lib/apiClient'

export default class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    validate:false,
    errMsg:'',
    isRequesting: false
  }

  render() {
    const {open, onClose} = this.props
    const {email, password, validate, errMsg, isRequesting} = this.state

    return (
      <div>
        <Modal open={open} onClose={onClose} center showCloseIcon={false}>
          <div className="form-wrap">
            <h2>Sign In</h2>
            {errMsg.length > 0 && <p className="error-msg"> {errMsg}</p>}
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

            <a onClick={this.signIn} disabled={isRequesting}>{isRequesting ? "Loading..." : "Sign In"}</a>
          </div>
        </Modal>
      </div>
    );
  }

  signIn = ()=>{
    this.setState({validate: true, errMsg: ''})
    const {email, password, validate} = this.state
    if (email.length > 0 && password.length > 0) {
        this.setState({isRequesting: true})
        apiClient
        .post('/sign_in', { email, password })
        .then((response) => {
          if (response.statusCode == 200) {
            this.setState({isRequesting: false})
            this.props.onClose()
          }else{
            //response.body.customerId
            //response.body.token
            this.setState({isRequesting: false, errMsg: response.body.message})
          }
        })
        .catch((errMsg) => this.setState({errMsg: 'Can not connect server.', isRequesting: false}))
    }

  }
}
