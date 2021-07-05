import React from "react";
// const FileUpload = require('react-fileupload');
import FileUpload from "./react-fileupload.jsx"; // 引用方式改成ES MOdule形式

class FileUploader extends React.Component {
  render() {
    const options = {
      baseUrl: "/manage/product/upload.do", // 图片上传后提交的目标地址
      fileFieldName: "upload_file",         // 为此类提交的图片起一个键名作为标识符
      dataType: "json",                     //  回应的格式
      chooseAndUpload: true,                // 是否在选择图片时自动提交
      uploadSuccess: (res) => {             //  成功提交后的回调函数                                        
        this.props.onSuccess(res.data);
      },
      uploadError: (err) => {              //未能成功提交的回调函数
        this.props.onError(err.message || '上传图片出错啦');
      },
    };
    return (
      <FileUpload options={options}>
        {/* <button ref="chooseBtn">choose</button>
        <button ref="uploadBtn">upload</button> */}
         <button ref="chooseAndUpload">请选择图片</button>
      </FileUpload>
    );
  }
}
export default FileUploader;
