import React from "react";
import { Link } from "react-router-dom";
import User from "service/user-service.jsx";
const _user = new User();
import MUtil from "util/mm.jsx";
const _mm = new MUtil();
import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1, //默认显示第一页
      data: {
        list: [],
        total: 0,
      }, // 返回数据
      firstLoading:true, // 判断是否是第一次加载
    };
  }

  componentDidMount() {
    this.loadUserList();
  }

  loadUserList() {
    _user
      .getUserList({
        pageNum: this.state.pageNum,
      })
      .then(
        (res) => {
          this.setState({
            data: res,
          },()=>{
            this.setState({
              firstLoading:false
            })
          });
        },
        (errMsg) => {
          _mm.errorTips(errMsg);
        }
      );
  }

  // 当页数发生变化的时候
  onPageNumChange(pageNum) {
    this.setState(
      {
        pageNum,
      },
      () => {
        this.loadUserList();
      }
    );
  }



  render() {
    let listBody = this.state.data.list.map((item, index) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{new Date(item.createTime).toLocaleString()}</td>
        </tr>
      );
    })

    let listError = (
      <tr>
        {/* <td colSpan="5" className="text-center">没有找到相应的结果</td> */}
        <td colSpan="5" className="text-center">
          {
            this.state.firstLoading ? '加载中。。。' : '没有找到相应的结果'
          }
        </td>
        
      </tr>
    )

    let tableBody = this.state.data.list.length > 0 ? listBody : listError

    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
        <div className="row">
          <div className="col-md-12">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>电话</th>
                  <th>注册时间</th>
                </tr>
              </thead>
              <tbody>
              {
                  tableBody
                }
                {/* {this.state.data.list.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.createTime}</td>
                    </tr>
                  );
                })} */}
              
              </tbody>
            </table>
            <Pagination
              current={this.state.pageNum}
              total={this.state.data.total}
              onChange={(pageNum) => this.onPageNumChange(pageNum)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserList;
