import React from "react";
import PageTitle from "component/page-title/index.jsx";
import { Link } from "react-router-dom";
import './index.scss'
import Statistic    from 'service/statistic-service.jsx'
const _statistic = new Statistic()

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: "-", // 用户总数初始化
      productCount: "-", // 商品总数初始化
      orderCount: "-", // 订单总数初始化
    };
  }

  componentDidMount(){
    this.loadCount();
}
loadCount(){
    _statistic.getHomeCount().then(res => {
        this.setState(res);
    }, errMsg => {
        _mm.errorTips(errMsg);
    });
}
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="首页" />
        {/* body也用 Bootstrap的栅栏系统  */}
        <div className="row">
          <div className="col-md-4">
            <Link to="/user" className="color-box brown">  {/* 背景色用的皮肤文件的样式 */}
              <p className="count">{this.state.userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>   {/* 字体图标用的font-awesome的样式 */}
                <span>用户总数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/product" className="color-box green">  
              <p  className="count">{this.state.userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>   
                <span>商品总数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/order" className="color-box blue">  
              <p className="count"> {this.state.userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>   
                <span>订单总数</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
