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
import Layout from "component/layout/index.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Layout>
          {/* Router里面只能有一个子组件，用Swicth包起来,Switch匹配到第一个就不往下匹配了 */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={Home} />
            <Route exact path="/product-category" component={Home} />
            <Route exact path="/order" component={Home} />
            <Route exact path="/user" component={Home} />
            {/* <Redirect from="*" to="/" /> */}
          </Switch>
        </Layout>
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
