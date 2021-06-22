import React from "react";
import NavTop from "../nav-top/index.jsx";
import NavSide from "../nav-side/index.jsx";
import "./theme.css";
import "./index.css"

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="wrapper">
        <NavTop /> {/* 头部导航 */}
        <NavSide /> {/* 侧边导航 */}
        {this.props.children} {/* Layout中包含的子组件 */}
      </div>
    );
  }
}

export default Layout;
