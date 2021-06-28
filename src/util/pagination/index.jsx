
import React        from 'react';
import RcPagination   from 'rc-pagination';  // Pagination和我们定义的组件名字一样有冲突，改成RcPagination
import 'rc-pagination/dist/rc-pagination.min.css';

// 通用分页组件
class Pagination extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <RcPagination {...this.props} 
                        hideOnSinglePage  // 只有一页的时候这个组件就不显示了(单页隐藏)
                        showQuickJumper   // 快速跳转
                    />
                </div>
            </div>
        );
    }
}

export default Pagination;