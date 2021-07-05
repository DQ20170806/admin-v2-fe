import React from "react";
class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType: "productId", // 搜索方式 默认按id搜索
      searchKeyword: "", // 关键词
    };
  }

  // 数据变化的时候
  onValueChange(e) {
    let name = e.target.name,
      value = e.target.value.trim();
    this.setState({
      [name]: value,
    });
  }

   // 点击搜索按钮
  onSearch(){
   this.props.onSearch(this.state.searchType,this.state.searchKeyword)
  }

  // 输入关键字后按回车，自动提交
  onSearchKeywordKeyUp(e){
    if(e.keyCode === 13){
        this.onSearch();
    }
}

  render() {
    return (
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select
                className="form-control"
                name="searchType"
                onChange={(e) => this.onValueChange(e)}
              >
                <option value="productId">按商品id查询</option>
                <option value="productName">按商品名称查询</option>
              </select>
            </div>
            <div className="form-group">
              <input
                name="searchKeyword"
                type="text"
                className="form-control"
                placeholder="关键词"
                onChange={(e) => this.onValueChange(e)}
                onKeyUp={()=> this.onSearchKeywordKeyUp(e)}
              />
            </div>
            <button className="btn btn-default" onClick={(e)=>this.onSearch()}>搜索</button>
          </div>
        </div>
      </div>
    );}}
export default ListSearch;
