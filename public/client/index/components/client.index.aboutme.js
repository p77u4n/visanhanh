import React from 'react';
var IconRect = React.createClass({
    render: function() {
        return (
            <div className={this.props.classN} style={{height: '100%'}}>
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className={this.props.figure}></i>
                </span>
                <h4 className="service-heading">{this.props.label}</h4>
            </div>
        );
    }
});

var AboutmeSection = React.createClass({
    render: function() {
        return (
            <section className="bg-light-gray" id="about">
                <div className="container text-center">
                    <h2 className="section-heading">
                        Về chúng tôi
                    </h2>
                    <h3 className="section-subheading">
                        Chúng tôi cung cấp dịch vụ làm, gia hạn visa, thị thực xuất cảnh và nhập cảnh thỏa mãn các tiêu chí dưới đây
                    </h3>
                    <div className="row text-center">
                        <IconRect classN="col-md-3 col-sm-12 col-xm-12" figure="fa fa-clock-o fa-stack-1x fa-inverse" label='Kịp thời '/>
                        <IconRect classN="col-md-3 col-sm-12 col-xm-12" figure="fa fa-cogs fa-stack-1x fa-inverse" label='Tiện lợi'/>
                        <IconRect classN="col-md-3 col-sm-12 col-xm-12" figure="fa fa-gavel fa-stack-1x fa-inverse" label='Hợp pháp'/>
                        <IconRect classN="col-md-3 col-sm-12 col-xm-12" figure="fa fa-heart fa-stack-1x fa-inverse" label='Thân thiện'/>
                    </div>
                </div>
             </section>
        );
    }
});





export default AboutmeSection;
