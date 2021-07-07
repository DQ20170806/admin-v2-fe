import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";

// 页面
import ProductList from "page/product/index/index.jsx";
import ProductSave from "page/product/index/save.jsx";
import ProductDetail from "page/product/index/detail.jsx";
import CategoryList from "page/product/category/index.jsx"
import CategoryAdd from "page/product/category/add.jsx"

class ProductRouter extends React.Component {

  render() {
    
    return (
      <Switch>
        <Route path="/product/index" component={ProductList} />
        <Redirect exact from="/product" to="/product/index" />
        {/* <Route path="/product/save/:pid" component={ProductSave} /> */}
        <Route path="/product/save/:pid?" component={ProductSave} />
        <Route path="/product/detail/:pid" component={ProductDetail} />
        <Route path="/product-category/index/:categoryId?" component={CategoryList} />
        <Redirect exact from="/product-category" to="/product-category/index" />
        <Route path="/product-category/add" component={CategoryAdd} />
      </Switch>
    );
  }
}
export default ProductRouter;
