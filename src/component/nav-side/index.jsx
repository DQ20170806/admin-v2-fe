import React from "react";
import { Link,NavLink } from "react-router-dom";

class NavSide extends React.Component {
  render() {
    return (
      <div className="navbar-default navbar-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav" id="main-menu">
            <li>
              {/* a标签改成Link标签，跳转到首页 */}
              <NavLink exact activeClassName="active-menu" to="/">
                <i className="fa fa-dashboard"></i>
                <span>首页</span>
              </NavLink>
            </li>
            <li className="active">
              <NavLink to="/product">
                <i className="fa fa-sitemap"></i>
                <span>商品</span>
                <span className="fa arrow"></span>
              </NavLink>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/product" activeClassName="active-menu">
                    <span>商品管理</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/product-category" activeClassName="active-menu">
                    <span>品类管理</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="active">
              <NavLink to="/order">
                <i className="fa fa-sitemap"></i>
                <span>订单</span>
                <span className="fa arrow"></span>
              </NavLink>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/order" activeClassName="active-menu">
                    <span>订单管理</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="active">
              <NavLink to="/user">
                <i className="fa fa-sitemap"></i>
                <span>用户</span>
                <span className="fa arrow"></span>
              </NavLink>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/user" activeClassName="active-menu">
                    <span>用户管理</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NavSide;
