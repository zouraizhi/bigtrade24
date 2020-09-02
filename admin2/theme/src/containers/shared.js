import React from 'react'
import { themeSettings, text } from '../lib/settings'
import Header from '../components/header'
import Footer from '../components/footer'
const Fragment = React.Fragment;
import SignInModal from '../components/signIn'
import SignUpModal from '../components/signUp'

class SharedContainer extends React.Component {
  state = {
    signInOpen:false,
    signUpOpen:false
  }

  render() {
    const {currentPage, settings} = this.props.state;
    let hideFooter = (currentPage.path === '/checkout-success' || currentPage.path === '/checkout') && themeSettings.hide_footer_on_checkout === true;

    return (
      <div>
        <Header {...this.props} />
        {this.props.children}
        <Footer settings={settings} onSignIn={()=>this.setState({signInOpen: true})} onSignUp={()=>this.setState({signUpOpen: true})}/>

        <SignInModal open={this.state.signInOpen} onClose={()=>this.setState({signInOpen: false})}/>
        <SignUpModal open={this.state.signUpOpen} onClose={()=>this.setState({signUpOpen: false})}/>
      </div>
    )
  }
}

export default SharedContainer
