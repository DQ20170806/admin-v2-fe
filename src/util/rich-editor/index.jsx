import React from "react";
import Simditor from "simditor";
import "simditor/styles/simditor.scss"; // node_modules下找到simditor安装包，然后styles下面的样式引进来

// 通用的富文本编辑器  依赖jquery
class RichEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadEditor();
  }

  componentWillReceiveProps(nextProps){
    const detailChange = this.props.defaultDetail !== nextProps.defaultDetail
    if(!detailChange){
      return
    }
    this.simditor.setValue(nextProps.defaultDetail)
  }

  loadEditor() {
    let element = this.refs["textarea"];
    // 用this.simditor接收
    this.simditor = new Simditor({
      textarea: $(element),
      defaultValue: this.props.placeholder || "请输入内容",
      upload: {
        url             : '/manage/product/richtext_img_upload.do',
        defaultImage    : '',
        fileKey         : 'upload_file' // 对应后端接口的字段名称
    }
    });
    this.bindEditorEvent();
  }
  // 初始化富文本编辑器的事件
  bindEditorEvent() {
    // 如果富文本有变化的时候，this.simdito 会触发onValuechanged这个事件，把这个事件暴露给父组件
    // 富文本的值 this.simditor.getValue()
    this.simditor.on("valuechanged", (e) => {
      this.props.onValueChange(this.simditor.getValue());
    });
  }
  render() {
    return (
      <div className="rich-editor">
        <textarea ref="textarea"></textarea>
      </div>
    );
  }
}

export default RichEditor;
