import React from "react";
import "./category-selector.scss";
import Product from "service/product-service.jsx";
import MUtil from "util/mm.jsx";
const _product = new Product();
const _mm = new MUtil();

class CategorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [], // 一级分类列表
      secondCategoryList: [], // 二级分类列表
      firstCategoryId: 0, // 一级分类选中id
      secondCategoryId: 0, // 二级分类选中id
    };
  }
  componentDidMount() {
    this.loadFirstCategory();
  }

  // props变化的时候触发的，componentWillReceiveProps方法中第一个参数代表即将传入的新的Props
  componentWillReceiveProps(nextProps) {
    // this.props来获取旧的外部状态，通过新旧状态的对比
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId;
    let parentCategoryIdChange =
      this.props.parentCategoryId !== nextProps.parentCategoryId;
    // 数据没有发生变化的时候，直接不做处理
    if (!categoryIdChange && !parentCategoryIdChange) {
      return;
    }
    // 假如只有一级品类
    if (nextProps.parentCategoryId === 0) {
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0,
      });
    }
    // 有两级品类
    else {
      this.setState(
        {
          firstCategoryId: nextProps.parentCategoryId,
          secondCategoryId: nextProps.categoryId,
        },
        () => {
          parentCategoryIdChange && this.loadSecondCategory();
        }
      );
    }
  }

  // 加载一级分类
  loadFirstCategory() {
    _product.getCategoryList().then(
      (res) => {
        this.setState({
          firstCategoryList: res,
        });
      },
      (errMsg) => {
        _mm.errorTips(errMsg);
      }
    );
  }

  // 选择一级品类
  onFirstCategoryChange(e) {
    if(this.props.readOnly){
      return
    }
    let newValue = e.target.value || 0;
    this.setState(
      {
        firstCategoryId: newValue,
        secondCategoryId: 0, // 一级品类改变后，先把二级品类id恢复初始值
        secondCategoryList: [], // 一级品类改变后，先把二级品类列表清空
      },
      () => {
        this.onPropsCategoryChange();
        this.loadSecondCategory(); // 加载二级品类
      }
    );
  }
  // 选择二级品类
  onSecondCategoryChange(e) {
    if(this.props.readOnly){
      return
    }
    let newValue = e.target.value || 0;
    this.setState(
      {
        secondCategoryId: newValue,
      },
      () => {
        this.onPropsCategoryChange();
      }
    );
  }

  // 传给父组件选中的结果
  onPropsCategoryChange() {
    // 判断父组件有没有这个方法
    let categoryChangable = typeof this.props.onCategoryChange === "function";
    // 如果是有二级品类
    if (this.state.secondCategoryId) {
      categoryChangable &&
        this.props.onCategoryChange(
          this.state.secondCategoryId,
          this.state.firstCategoryId // 第二个参数是父id
        );
    }
    // 如果只有一级品类
    else {
      categoryChangable &&
        this.props.onCategoryChange(this.state.firstCategoryId, 0); //// 第二个参数是父id
    }
  }

  // 加载二级分类
  loadSecondCategory() {
    _product.getCategoryList(this.state.firstCategoryId).then(
      (res) => {
        this.setState({
          secondCategoryList: res,
        });
      },
      (errMsg) => {
        _mm.errorTips(errMsg);
      }
    );
  }

  render() {
    return (
      <div className="col-sm-10">
        <select
          className="form-control cate-select"
          onChange={(e) => this.onFirstCategoryChange(e)}
          value={this.state.firstCategoryId}
          readOnly={this.props.readOnly}
        >
          <option>请选择一级品类</option>
          {this.state.firstCategoryList.map((item, index) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
        {this.state.secondCategoryList.length > 0 && (
          <select
            className="form-control cate-select"
            onChange={(e) => this.onSecondCategoryChange(e)}
            value={this.state.secondCategoryId}
            readOnly={this.props.readOnly}
          >
            <option>请选择二级品类</option>
            {this.state.secondCategoryList.map((item, index) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
    );
  }
}
export default CategorySelector;
