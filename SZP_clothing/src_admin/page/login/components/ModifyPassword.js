/*
 * author: zero
 * createdTime: 2018/01/18
 * */

import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'antd'
import md5 from 'md5'
import ShinningInput from './ShinningInput'
import {
  API_POST_USER_CENTER_SMS_CODE,
  API_POST_USER_CENTER_GET_BACK
} from 'api'
import {getData} from 'util'
import style from '../style/ModifyPassword.scss'
import {message} from 'antd'

function phoneValidator(phone) {
  return /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(phone)
}

function passwordValidator(password) {
  return /^[a-z|A-Z|0-9]{6,12}$/.test(password)
}

class ModifyPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errMsg: '',

      phone: '',
      code: '',
      password: '',
      confirmPassword: '',

      smsCodeLoading: false,
      smsSecondCount: 0,
      smsSecondTimer: null,

      resetPasswordLoading: false,

      step: 0
    }
    this.selfRef = null
  }

  componentWillUnmount() {
    this.clearSmsTimer()
  }

  clearSmsTimer() {
    const {smsSecondTimer} = this.state
    smsSecondTimer && clearInterval(smsSecondTimer)
  }

  startSmsTimer() {
    this.clearSmsTimer()

    const timer = setInterval(() => {
      const count = this.state.smsSecondCount - 1
      this.setState({smsSecondCount: count})
      if (count === 0) {
        this.clearSmsTimer()
      }
    }, 1000)

    this.setState({smsSecondCount: 59, smsSecondTimer: timer})
  }

  handleBackClick = e => {
    e.preventDefault()
    const cb = this.state.step === 0
      ? this.props.onBack
      : () => this.setState({step: 0, password: '', confirmPassword: ''})
    cb()
  }

  handleSubmit = e => {
    e.preventDefault()
    const {phone: telephone, code: smsCode, password} = this.state
    this.requestResetPassword({telephone, smsCode, password: md5(password)})
      .then(data => {
        message.config({getContainer: () => this.selfRef, top: 150})
        message.success('修改成功', 2, this.props.onBack)
        message.config({})
      }, ({code, message}) => {
        if (code === 600218) {
          this.setState({step: 0})
        }
        this.setState({errMsg: message})
      })
  }

  handleFormItemChange = (field, val) => this.setState({[field]: val})

  handlePhoneBlur = e => {
    const phone = e.target.value
    let errMsg = ''
    if (phone && !phoneValidator(phone)) {
      errMsg = '非法的手机号'
    }
    this.setState({errMsg})
  }

  handleCodeBtnClick = e => {
    this.requestSMSCode({telephone: this.state.phone})
      .then(data => {
        this.startSmsTimer()
      }, err => {
        this.setState({errMsg: err})
      })
  }

  handleNextStepClick = e => {
    e.preventDefault()
    this.setState({step: 1})
  }

  handlePasswordBlur = e => {
    const val = e.target.value
    let errMsg = ''
    if (val && !passwordValidator(val)) {
      errMsg = '6-12位，数字字母均可'
    }
    this.setState({errMsg})
  }

  handleConfirmPasswordBlur = e => {
    const val = e.target.value
    const {password} = this.state
    let errMsg = ''
    if (val && password && val !== password) {
      errMsg = '两次输入的密码不一致'
    } else if (val && !passwordValidator(val)) {
      errMsg = '6-12位，数字字母均可'
    }
    this.setState({errMsg})
  }

  requestSMSCode(data) {
    this.setState({smsCodeLoading: true})
    return getData({api: API_POST_USER_CENTER_SMS_CODE, data})
      .then(data => {
        this.setState({smsCodeLoading: false})
        if (data.code === 200000) {
          return data
        } else {
          throw data.message
        }
      }, err => {
        this.setState({smsCodeLoading: false})
      })
  }

  requestResetPassword(data) {
    this.setState({resetPasswordLoading: true})
    return getData({api: API_POST_USER_CENTER_GET_BACK, data})
      .then(data => {
        this.setState({resetPasswordLoading: false})
        if (data.code === 200000) {
          return data
        } else {
          throw data
        }
      }, err => {
        this.setState({resetPasswordLoading: false})
      })
  }

  render() {
    const {phone, code, password, confirmPassword, smsCodeLoading, smsSecondCount, step, resetPasswordLoading, errMsg} = this.state
    const isPhoneVerified = phoneValidator(phone)
    const codeBtnVisible = isPhoneVerified || smsSecondCount > 0
    const shouldDisableCodeBtn = !isPhoneVerified || smsCodeLoading || smsSecondCount > 0
    const shouldDisableNextStep = !isPhoneVerified || !code
    const shouldDisableSubmit = !passwordValidator(password) || password !== confirmPassword || resetPasswordLoading

    return (
      <div className={style.modifyPassword} ref={ref => this.selfRef = ref}>
        <div className={style.flexLine}>
          <a href="" onClick={this.handleBackClick}>
            <Icon type="arrow-left" theme="outlined" />
            返回
          </a>
          <h1>{step === 0 ? '手机验证' : '设置密码'}</h1>
        </div>

        <form action="" onSubmit={this.handleSubmit}>
          {step === 0 ? (
            <Fragment key={step}>
              <div className={style.formItem}>
                <ShinningInput
                  label="手机号"
                  placeholder="手机号"
                  value={phone}
                  onChange={e => this.handleFormItemChange('phone', e.target.value)}
                  onBlur={this.handlePhoneBlur}
                />
              </div>
              <div className={style.formItem}>
                <ShinningInput
                  label="验证码"
                  placeholder="验证码"
                  value={code}
                  onChange={e => this.handleFormItemChange('code', e.target.value)}
                />
                {codeBtnVisible &&
                <button
                  className={style.smsCodeBtn}
                  disabled={shouldDisableCodeBtn}
                  onClick={this.handleCodeBtnClick}
                >
                  {smsSecondCount > 0 ? `${smsSecondCount}s` : '获取验证码'}
                </button>
                }
              </div>
            </Fragment>
          ) : (
            <Fragment key={step}>
              <div className={style.formItem}>
                <ShinningInput
                  label="新密码"
                  placeholder="新密码"
                  value={password}
                  type="password"
                  onChange={e => this.handleFormItemChange('password', e.target.value)}
                  onBlur={this.handlePasswordBlur}
                />
              </div>
              <div className={style.formItem}>
                <ShinningInput
                  label="确认新密码"
                  placeholder="确认新密码"
                  value={confirmPassword}
                  type="password"
                  onChange={e => this.handleFormItemChange('confirmPassword', e.target.value)}
                  onBlur={this.handleConfirmPasswordBlur}
                />
              </div>
            </Fragment>
          )}

          <div className={style.formItem}>
            <div className={style.errMsg}>
              {errMsg &&
              <span>
                <Icon type="exclamation-circle" theme="filled" />
                {errMsg}
              </span>
              }
            </div>
          </div>

          {step === 0 ? (
            <div className={style.formItem}>
              <button className={style.submitBtn} disabled={shouldDisableNextStep} onClick={this.handleNextStepClick}>下一步</button>
            </div>
          ) : (
            <div className={style.formItem}>
              <button type="submit" className={style.submitBtn} disabled={shouldDisableSubmit}>提交</button>
            </div>
          )}
        </form>
      </div>
    )
  }
}

ModifyPassword.propTypes = {
  onBack: PropTypes.func.isRequired
}

export default ModifyPassword
