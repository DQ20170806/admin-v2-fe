import React from "react";
import { Link } from "react-router-dom";
import MUtil from "util/mm.jsx";
import Product from "service/product-service.jsx";
import PageTitle from "component/page-title/index.jsx";
import TableList from "util/table-list/index.jsx";
const _mm = new MUtil();
const _product = new Product();

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [], // 列表数据
      parentCategoryId: this.props.match.params.categoryId || 0, // 品类列表需要传用的参数
    };
  }
  componentDidMount() {
    this.loadCategoryList();
  }

  componentDidUpdate(prevProps, prevState) {
    let oldPath = prevProps.location.pathname; // preProps 上一个状态的props
    let newPath = this.props.location.pathname;
    let newId = this.props.match.params.categoryId || 0; // 跳转后路径后面传的参数
    if (oldPath !== newPath) {
      this.setState(
        {
          parentCategoryId: newId,
        },
        () => {
          this.loadCategoryList();
        }
      );
    }
  }
  // 加载品类列表
  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(
      (res) => {
        this.setState({
          list: res,
        });
      },
      (errMsg) => {
        this.setState({
          list: [],
        });
        _mm.errorTips(errMsg);
      }
    );
  }

  // 更新品类的名字
  onUpdateName(categoryId, categoryName) {
    let newName = window.prompt("请输入新的品类名称", categoryName); //显示可提示用户进行输入的对话框。 这个方法返回用户输入的字符串,（默认显示原来的品类名称）
    if (newName) {
      _product
        .updateCategoryName({
          categoryId: categoryId,
          categoryName: newName,
        })
        .then(
          (res) => {
            _mm.successTips(res);
            this.loadCategoryList();
          },
          (errMsg) => {
            _mm.errorTips(errMsg);
          }
        );
    }
  }

  render() {
    let listBody = this.state.list.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>
            <a
              className="opear"
              onClick={(e) => this.onUpdateName(item.id, item.name)}
            >
              修改名称
            </a>

            {item.parentId === 0 ? (
              <Link to={`/product-category/index/${item.id}`}>查看子品类</Link>
            ) : null}
          </td>
        </tr>
      );
    });
    return (
      <div id="page-wrapper">
        <PageTitle title="品类列表">
          <div className="page-header-right">
            <Link to="/product-category/add" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              <span>添加品类</span>
            </Link>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            <p>父品类ID: {this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList tableHeads={["品类ID", "品类名称", "操作"]}>
          {listBody}
        </TableList>
      </div>
    );
  }
}

export default CategoryList;
