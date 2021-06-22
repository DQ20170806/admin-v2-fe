import React from 'react'

class PageTitle extends React.Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        document.title = this.props.title + ' - HAPPY MMALL';
    }
  
    render(){
        return (
            // BootStrap中的栅栏系统 row  col-md-12(只有一列占满一行)
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">{this.props.title}</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default PageTitle;