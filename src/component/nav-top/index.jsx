import React from "react";
import { Link } from "react-router-dom";

class NavTop extends React.Component {
  onLogOut = () =>{
    console.log("退出登录 。。")
  }
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
              <i className="fa fa-user fa-fw"></i> <span>欢迎。。。。</span>
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
