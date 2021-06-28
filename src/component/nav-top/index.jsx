import React from "react";
import { Link } from "react-router-dom";
import MUtil from "util/mm.jsx";
import User from "service/user-service.jsx"
import _ from "lodash";
const _mm = new MUtil();
const _user = new User()

class NavTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: _mm.getStorage("userInfo").username || "",
    };
  }
  onLogOut = () => {
    _user.logout().then((res)=>{

      // 退出登录接口调用成功后，删除本地存储的用户信息，然后跳转到登录页
      _mm.removeStorage("userInfo")
      // this.props.history.push('/login') // 因为nav-top这个组件不是通过Route引入的，所以不能继承Route的historty对象
      window.location.href="/login"

    },(errMsg)=>{
     //  退出登录接口调用失败，给出失败信息
     _mm.errorTips(errorMsg)
    })

  };
  render() {
    return (
      // <div className="navbar navbar-default top-navbar" role="navigation">
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".sidebar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          {/* <a className="navbar-brand" href="index.html">
            <b>In</b>sight
          </a> */}
          {/* a标签改成react-router中的跳转链接Link href改为to 跳转到首页 */}
          <Link className="navbar-brand" to="/">
            <b>Happy</b>Mall
          </Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              // data-toggle="dropdown"
              // href="#"
              href="javascript:;" // 改成“javascript:;” 就没有js的事件了
              aria-expanded="false"
            >
              <i className="fa fa-user fa-fw"></i>
              {this.state.userName ? (
                <span>欢迎,{this.state.userName}</span>
              ) : (
                <span>欢迎您</span>
              )}

              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                {/* <a href="#">
                  <i className="fa fa-sign-out fa-fw"></i> Logout
                </a> */}
                {/* 给a标签加一个事件 */}
                <a onClick={() => this.onLogOut()}>
                  <i className="fa fa-sign-out fa-fw"></i>
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavTop;
