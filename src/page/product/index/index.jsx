import React from "react";
import { Link } from "react-router-dom";
import Product from "service/product-service.jsx";
const _product = new Product();
import MUtil from "util/mm.jsx";
const _mm = new MUtil();
import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import TableList from "util/table-list/index.jsx";
import "./index.scss";
import ListSearch from "./index-list-search.jsx";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1, //默认显示第一页
      data: {
        list: [],
        total: 0,
      }, // 返回数据
      listType: "list", // 判断是调用列表接口 还是搜索接口，默认是列表
    };
  }

  componentDidMount() {
    this.loadProductList();
  }

  loadProductList() {
    let listParam = {};
    // 无论是列表还是搜索形式，都需要传值listType paramNum
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    // 如果是搜索的话，需要传入搜索类型和搜索关键字
    if (this.state.listType === "search") {
      listParam.searchType = this.state.searchType;
      listParam.keyword = this.state.searchKeyword;
    }
    _product.getProductList(listParam).then(
      (res) => {
        this.setState({
          data: res,
        });
      },
      (errMsg) => {
        this.setState({
          data: {
            list: [],
          },
        });
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
        this.loadProductList();
      }
    );
  }

  // 改变商品状态(上架/下架)
  onSetProductStatus(e, productId, currentStatus) {
    const newStatus = currentStatus == 1 ? 2 : 1;
    const cofirmTips =
      currentStatus == 1 ? "确定要下架该商品？" : "确定要上架该商品？";
    // 改变之前给一个提示
    if (window.confirm(cofirmTips)) {
      _product
        .setProductStatus({
          productId: productId,
          status: newStatus,
        })
        .then(
          (res) => {
            // 修改成功后给一个提示在刷新列表接口
            _mm.successTips(res);
            this.loadProductList();
          },
          (errMsg) => {
            _mm.errorTips(res);
          }
        );
    }
  }

  // 搜索
  onSearch(searchType, searchKeyword) {
    console.log("searchType..", searchType);
    console.log("searchKeyword...", searchKeyword);
    // 输入框有值就是搜索的形式
    let listType = searchKeyword === "" ? "list" : "search";
    this.setState(
      {
        listType: listType,
        pageNum: 1,
        searchType: searchType,
        searchKeyword: searchKeyword,
      },
      () => {
        this.loadProductList();
      }
    );
  }

  render() {
    let tableHeades = [
      {
        name: "商品id",
        width: "10%",
      },
      {
        name: "商品信息",
        width: "50%",
      },
      {
        name: "价格",
        width: "10%",
      },
      {
        name: "状态",
        width: "15%",
      },
      {
        name: "操作",
        width: "10%",
      },
    ];
    return (
      <div id="page-wrapper">
        {/* <PageTitle title="商品管理" /> */}
        <PageTitle title="商品管理">
          <div className="page-header-right">
            <Link to="/product/save" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              添加商品
            </Link>
          </div>
        </PageTitle>
        <ListSearch
          onSearch={(searchType, searchKeyword) =>
            this.onSearch(searchType, searchKeyword)
          }
        />
        {/* <div className="row search-wrap">
          <div className="col-md-12">
            <div className="form-inline">
              <div className="form-group">
                <select className="form-control">
                  <option value="productId">按商品id查询</option>
                  <option value="productName">按商品名称查询</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  // type="password"
                  type="text"
                  className="form-control"
                  placeholder="关键词"
                />
              </div>
              <button className="btn btn-default">查询</button>
            </div>
          </div>
        </div> */}
        <TableList tableHeads={tableHeades}>
          {this.state.data.list.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <p>{item.name}</p>
                  <p>{item.subtitle}</p>
                </td>
                <td>{item.price}</td>
                <td>
                  <p>{item.status == 1 ? "在售" : "已下架"}</p>
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={(e) =>
                      this.onSetProductStatus(e, item.id, item.status)
                    }
                  >
                    {item.status == 1 ? "下架" : "上架"}
                  </button>
                </td>
                <td>
                  <Link className="opear" to={`/product/detail/${item.id}`}>
                    详情
                  </Link>
                  <Link className="opear" to={`/product/save/${item.id}`}>
                    编辑
                  </Link>{" "}
                  {/* product/save是编辑和新建共用的页面，传id就是编辑，不传就是新建 */}
                </td>
              </tr>
            );
          })}
        </TableList>
        <Pagination
          current={this.state.pageNum}
          total={this.state.data.total}
          onChange={(pageNum) => this.onPageNumChange(pageNum)}
        />
      </div>
    );
  }
}

export default ProductList;
