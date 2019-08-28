import React, {Component} from 'react'
import {
  SignIn,
  ModifyPassword
} from './components'
import style from './style/index.scss'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      childCompType: 'SIGN-IN'
    }
  }

  handleForgetPWD = () => {
    this.setState({childCompType: 'MODIFY-PWD'})
  }

  handleBack = () => {
    this.setState({childCompType: 'SIGN-IN'})
  }

  render() {
    const {childCompType} = this.state
    const childComp = {
      'SIGN-IN': <SignIn onForgetPWD={this.handleForgetPWD} />,
      'MODIFY-PWD': <ModifyPassword onBack={this.handleBack} />
    }[childCompType]

    return (
      <section className={style.login}>
        <div className={style.bg}>
          <div className={style.centerBox}>
            <div className={style.leftImgBox} />
            <div className={style.rightFormBox}>
              { childComp }
            </div>
          </div>
        </div>
      </section>
    )
  }
}
