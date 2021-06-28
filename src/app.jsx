import React, { Children } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "page/home/index.jsx";
import Login from "page/login/index.jsx";
import Layout from "component/layout/index.jsx";
import ErrorPage from "page/error/index.jsx"
import UserList from 'page/user/index.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let LayoutRouter = (
      <Layout>
      {/* Swicth包起来,Switch匹配到第一个就不往下匹配了 */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product" component={Home} />
        <Route exact path="/product-category" component={Home} />
        <Route exact path="/order" component={Home} />
        <Route path="/user/index" component={UserList}/>
        <Redirect exact from="/user" to="/user/index"/>   {/* 从菜单点的是/user 它会跳转到/user/index  然后/user/index会渲染UserList组件 */}
        <Route component={ErrorPage}/>

      </Switch>
    </Layout>
  );
    return (
      <Router>
        <Switch>
          {/* 登录页 */}
          <Route path="/login" component={Login} />
          {/* 不是登录页，用Layout包裹显示菜单 */}
          <Route
            path="/"
            render={(props) => LayoutRouter}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("app")
);
