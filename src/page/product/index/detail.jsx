import React from "react";
import PageTitle from "component/page-title/index.jsx";
import CategorySelector from "./category-selector.jsx";
import MUtil from "util/mm.jsx";
import Product from "service/product-service.jsx";
const _product = new Product();
const _mm = new MUtil();
import "./save.scss";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.pid,
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      detail: "",
      name: "",
      subtitle: "",
      price: "",
      stock: "",
      status: 1, //商品状态1为在售
    };
  }
  componentDidMount() {
    this.loadProduct();
  }
  // 加载商品详情
  loadProduct() {
    // 有id的时候，表示是编辑功能，需要表单回填
    if (this.state.id) {
      _product.getProduct(this.state.id).then(
        (res) => {
          // 拿到的详情数据，只要处理一下subImages,其他字段不用处理
          let images = res.subImages.split(",");
          res.subImages = images.map((item) => {
            return {
              uri: item,
              url: res.imageHost + item,
            };
          });
          res.defaultDetail = res.detail;
          this.setState(res);
        },
        (errMsg) => {
          _mm.errorTips(errMsg);
        }
      );
    }
  }
  // 品类选择器的变化
  onCategoryChange(categoryId, parentCategoryId) {
    this.setState({
      categoryId,
      parentCategoryId,
    });
  }
  // 上传图片成功
  onUploadSuccess(res) {
    let subImages = this.state.subImages;
    subImages.push(res);
    this.setState({
      subImages: subImages,
    });
  }
  // 上传图片失败
  onUploadError(errMsg) {
    _mm.errorTips(errMsg);
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">商品名称</label>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                // placeholder="请输入商品名称"
                // name="name"
                value={this.state.name}
                readOnly
                // onChange={(e) => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品描述</label>
            <p className="form-"></p>
            <div className="col-sm-5">
              <input
                type="text"
                className="form-control"
                readOnly
                // placeholder="请输入商品描述"
                // name="subtitle"
                value={this.state.subtitle}
                // onChange={(e) => this.onValueChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">所属分类</label>
            <CategorySelector
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
              onCategoryChange={(categoryId, parentCategoryId) =>
                this.onCategoryChange(categoryId, parentCategoryId)
              }
              readOnly
            />
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品价格</label>
            <div className="col-sm-3">
              {/* <input
                type="number"
                className="form-control"
                placeholder="请输入价格"
              /> */}
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  // placeholder="请输入价格"
                  // name="price"
                  value={this.state.price}
                  readOnly
                  // onChange={(e) => this.onValueChange(e)}
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品库存</label>
            <div className="col-sm-3">
              {/* <input
                type="number"
                className="form-control"
                placeholder="请输入库存"
              /> */}
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  // placeholder="请输入库存"
                  // name="stock"
                  value={this.state.stock}
                  readOnly
                  // onChange={(e) => this.onValueChange(e)}
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品图片</label>
            <div className="col-sm-10">
              {this.state.subImages.length ? (
                <div className="img-con">
                  {this.state.subImages.map((item, index) => {
                    return (
                      <div class="img-con-item" key={index}>
                        <img src={item.url} />
                        <i
                          className="fa fa-close"
                          index={index}
                          onClick={(e) => this.onImageDelete(e)}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>暂无图片</div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品详情</label>
            <div
              className="col-sm-5"
              dangerouslySetInnerHTML={{ __html: this.state.detail }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductDetail;
