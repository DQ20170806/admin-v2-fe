import React from "react";
import "./index.scss";
import MUtil from "util/mm.jsx";
const _mm = new MUtil();
import User from "service/user-service.jsx";
const _user = new User();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      redirect: _mm.getUrlParam("redirect") || "", //  mm.jsx中定义一个取参数的方法
    };
  }

  componentWillMount(){
    document.title="登录-Mall Admin"
  }

  // 点击登录按钮提交表单
  onSubmit = (e) => {
    let loginInfo = {
      username: this.state.userName,
      password: this.state.passWord,
    };

    //判断用户名密码是否合法
    let checkResult = _user.checkLoginInfo(loginInfo);

    if (checkResult.status) {
      // 验证通过
      _user.login(loginInfo).then(
        (res) => {
          _mm.setStorage("userInfo",res)
          //  登录成功跳回原来的页面
          this.props.history.push(this.state.redirect);
        },
        (errMsg) => {
          //在mm.jsx中封装一个错误提示的方法
          _mm.errorTips(errMsg);
        }
      );
    } else {
      //  验证不通过
      _mm.errorTips(checkResult.msg);
    }
  };

  // 当输入框发生改变
  onInputChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    this.setState({
      [inputName]: inputValue,
    });
  };

  onInputKeyUp= (e) =>{
    // 判断是回车键盘
    if(e.keyCode == 13){
      this.onSubmit()
    }
  }

  render() {
    console.log(this.state);
    return (
      // col-md-4 占四列   col-sm-offset-4 左边空出四列
      <div className="col-md-4 col-sm-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">
            <h3 className="panel-title">欢迎登录-happy mall后台管理系统</h3>
          </div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                {/* <label for="exampleInputEmail1">用户名</label> */}
                {/* jsx用for 改成htmlFor */}
                <label htmlFor="exampleInputEmail1">用户名</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="请输入用户名"
                  name="userName" // 给输入框name属性一个值,跟state定义的属性名统一 一下
                  onChange={this.onInputChange}
                  onKeyUp={this.onInputKeyUp}
                />
              </div>
              <div className="form-group">
                {/* <label for="exampleInputPassword1">密码</label> */}
                <label htmlFor="exampleInputPassword1">密码</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="请输入密码"
                  name="passWord"
                  onChange={this.onInputChange}
                  onKeyUp={this.onInputKeyUp}
                />
              </div>

              {/* <button type="submit" className="btn btn-default"> */}
              {/* 按钮改成大一点蓝色的 宽度100%占满  */}
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={this.onSubmit}
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
