/**
 * Created by 李华良 on 2018/10/17
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'antd'
import ShinningInput from './ShinningInput'

import style from '../style/SignIn.scss'
import {history} from 'RouterAdmin'
import {getData, getQueryString} from 'util'
import {setVariant} from 'Variant'
import {API_LOGIN} from 'api'
import md5 from 'md5'
import {connect} from 'react-redux'
import {mapDispatchToProps} from '../../../redux/map'

@connect(
  state => ({...state}),
  mapDispatchToProps
)
class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errMsg: '',

      // form value
      username: '',
      password: '',
      autoLogin: false
    }
  }

  componentDidMount() {

  }
  handleFormItemChange = (field, val) => this.setState({[field]: val, errMsg: ''})

  handleForgetPWDClick = e => {
    e.preventDefault()
    this.props.onForgetPWD()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.requestLogin()
  }

  requestLogin = () => {
    const {username, password} = this.state
    return getData({api: API_LOGIN, data: {phone: username, password: password}}).then(data => {
      if (data.code == 200000 && data.message === 'success') {
        // 本地缓存用户信息
        let userInfos = {
          email: data.result.email,
          id: data.result.id,
          nickname: data.result.nickname,
          telephone: data.result.phone,
          userNo: data.result.userNumber,
          username: data.result.name,
          workType: data.result.workType
        }
        this.props.updateUser({previewData: '已登录', userInfos})
        setVariant('userInfos', JSON.stringify(userInfos))
        window.yh_trace.setUserId(userInfos.id)
        window.yh_trace.sendEvent('login_success', username)
        this.getAuthButtons()
      } else {
        this.setState({errMsg: data.message})
        window.yh_trace.sendEvent('login_failed', username)
      }
    })
  }

  getAuthButtons = () => {
    let page = getQueryString('backUrl') ? getQueryString('backUrl') : '/gss/home'
    // getData({api: API_GET_USER_CENTER_PERMISSIONS_BANS}).then(data => {
    //   // 页面按钮 级别的权限
    //   localStorage.setItem('permissionsButtonsBans', JSON.stringify(data.result))
    //   let page = getQueryString('backUrl') ? getQueryString('backUrl') : '/gss/home'
    // })
    history.replace(page)
  }

  render() {
    const shouldDisableSubmit = !this.state.username || !this.state.password
    return (
      <div className={style.signIn}>
        <div className={style.flexLine}>
          <h1>欢迎登录</h1>
        </div>

        <form action="" onSubmit={this.handleSubmit}>
          <div className={style.formItem}>
            <ShinningInput
              label="用户名"
              placeholder="用户名"
              onChange={e => this.handleFormItemChange('username', e.target.value)}
            />
          </div>
          <div className={style.formItem}>
            <ShinningInput
              label="密码"
              placeholder="密码"
              type="password"
              onChange={e => this.handleFormItemChange('password', e.target.value)}
            />
            <div className={style.flexLine}>
              <div className={style.errMsg}>
                {this.state.errMsg &&
                  <span>
                    <Icon type="exclamation-circle" theme="filled" />
                    {this.state.errMsg}
                  </span>
                }
              </div>
              <a onClick={this.handleForgetPWDClick}>忘记密码？</a>
            </div>
          </div>
          <div className={style.formItem}>
            <button type="submit" className={style.submitBtn} disabled={shouldDisableSubmit}>登录</button>
          </div>
        </form>
      </div>
    )
  }
}

SignIn.propTypes = {
  // provided by redux
  // addList: PropTypes.func.isRequired,
  // setUserInfos: PropTypes.func.isRequired,
  onForgetPWD: PropTypes.func.isRequired
}

SignIn.defaultProps = {}

export default SignIn
