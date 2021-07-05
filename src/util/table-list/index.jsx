import React from "react";
import Pagination from "util/pagination/index.jsx";

// 通用表格
class TableList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // 接收表头信息
    let tableHeader = this.props.tableHeads.map((item, index) => {
      if (typeof item == "object") {
        return (
          <th key={index} width={item.width}>
            {item.name}
          </th>
        );
      } else if (typeof item == "string") {
        return <th key={index}>{item}</th>;
      }
    });
    
    // let tableHeader = this.props.tableHeads.map((item, index) => {
    //   return <th key={index}>{item}</th>;
    // });

    // 表格内容
    let listBody = this.props.children;

    let listError = (
      <tr>
        <td colSpan={this.props.tableHeads.length} className="text-center">
          没有找到相应的结果
        </td>
      </tr>
    );
    // 表格内容判断是否为空情况
    let tableBody = listBody.length > 0 ? listBody : listError;

    return (
      <div className="row">
        <div className="col-md-12">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>{tableHeader}</tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableList;
