import React, {Component} from 'react';

class ServiceSection extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <section className="text-center" id="services">
                <h1 className="section-heading">Dịch vụ</h1>
                <div className="container" id="inputform">
                    <div className="row text-center" style={{marginLeft:'0px', marginRight:'0px'}}>
                        <ServiceRect classN="col-lg-4 col-md-4 col-sm-12 col-xs-12" imgsrc="img/xuatcanh.jpg" serviceName="Làm Visa xuất cảnh" targetModal="#xc_modal"/>
                        <ServiceRect classN="col-lg-4 col-md-4 col-sm-12 col-xs-12" imgsrc="img/nhapcanh.jpg" serviceName="Làm Visa xuất cảnh" targetModal="#nc_modal"/>
                        <ServiceRect classN="col-lg-4 col-md-4 col-sm-12 col-xs-12" imgsrc="img/giahan.jpg" serviceName="Làm Visa xuất cảnh" targetModal="#gh_modal"/>
                    </div>
                </div>
                <LoginForm title="Thông tin về bạn" subtitle=" Để đăng ký dịch vụ, vui lòng cung cấp các thông tin dưới đây, xin cảm ơn :)" items={[{label:"tên của bạn", pretext:"Họ và tên", type:"usrName", id:"usrname", labelClass: "fa fa-user"}, {label:"số điện thoại", pretext:"Số điện thoại", type:"usrName", id:"usrsdt", labelClass: "fa fa-phone"}]}/>
                
                <SubmitForm idType="xc_modal" label="Dịch vụ xuất cảnh" imgSrc="img/input-xc.jpg"  items={[{label: "QUỐC GIA", preText: "", id: "qg" }, {label: "THỜI GIAN CHỜ", preText: "ngày", id: "tgc" }, {label: "SỐ LƯỢNG", preText: "", id: "sl" }]} />
                <SubmitForm idType="nc_modal" label="Dịch vụ nhập cảnh" imgSrc="img/input-nc.jpg" items={[{label: "THỜI GIAN CHỜ", preText: "ngày", id: "tgc" }, {label: "SỐ LƯỢNG", preText: "", id: "sl" }]} />
                <SubmitForm idType="gh_modal" label="Dịch vụ gia hạn" imgSrc="img/input-gh.jpg" items={[{label: "QUỐC GIA", preText: "", id: "qg" },{label: "THỜI GIAN CHỜ", preText: "ngày", id: "tgc" },{label: "XIN GIA HẠN", preText: "ngày", id: "xgh" }, {label: "SỐ LƯỢNG", preText: "", id: "sl" }]} />
            </section>
        );
    }

}



class Input extends Component {
    
    
    constructor(props){
        super(props);
        this.state = {isValidated: false, content: "", isTouched: false, msg: ""}; 
        this.handleChange = this.handleChange.bind(this);
        this.handleUnfocused = this.handleUnfocused.bind(this);
    }

    handleChange (event) {
        this.setState({isValidated: this.state.isValidated, content: event.target.value});
    }
    
    handleUnfocused () {
        var result = this.props.checkValidate(this.props.type, this.state.content);
        var resultOverall = true;
        var returnResult;
        this.state.msg="";
        for(var key in result) {
            if(result.hasOwnProperty(key)) {
                resultOverall = resultOverall && result[key];
                if(key === "required" && result[key] === false) {
                    this.state.msg = "Vui lòng điền thông tin yêu cầu.";
                }else{
                    if(result[key] === false)
                    this.state.msg = "Vui lòng nhập thông tin chính xác.";
                }
            }
        }
        returnResult["validated"] = resultOverall;
        returnResult["content"] = this.state.content;
        this.props.updateValidateState(this.props.id, returnResult);
        this.setState({isValidated: false, content: this.state.content});
    }

    render() {
        var style = this.state.isValidated ? {display: 'none'} : {display : 'block'};
        return (
            <div>
                <input ref="refbutton"  type={this.props.type} className={this.props.class} placeholder={this.props.placeholder} value={this.state.content}  onChange={this.handleChange} onFocusOut={this.handleUnfocused} name={this.props.name}/>
                <i className={this.props.labelClass}></i>
                <p style={style}>{this.state.msg}</p>
            </div>
        )
    }
}

class ServiceRect extends Component{
    constructor (props) {
        super(props);
    }
    render () {
        
        return (
            <div className={this.props.classN}>
                <div className="hover ehover12">
                    <img className="img-responsive" src={this.props.imgsrc} alt="" style={{height:'100%', width:'100%'}}/>
                    <div className="overlay">
                        <h2>{this.props.serviceName}</h2>
                        <button className="info" data-toggle="modal" data-target={this.props.targetModal}>Đặt dịch vụ
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    
    constructor (props) {
        super(props);
        var state = new Object();
        state["serverContent"] = this.props.subtitle;
        this.props.items.forEach( function(item, index) {
            state[item.id] = false;
            state["inputContent"] = new Object();
            state["inputContent"][item.id] = "";
        });
        
        this.state = state;
        this.updateValidateState = this.updateValidateState.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
        this.sendFormData = this.sendFormData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.rules = {
            usrName : {
                required : true,
                minlength : 2,
                regex : "^[\\p{L} .'-]+$"
            },
            usrSdt : {
                required : true,
                minlength : 7,
                maxlength : 11,
                regex : "\d+"
            }
        };
    }

    updateValidateState (inputId, status) {
        let newState = Object.assign({}, this.state);
        newState[inputId] = status.validated;
        newState["inputContent"][inputId] = status.content;
        this.setState(newState);
        
    }

    

    checkValidate (type, val) {
        var requirements = this.rules[key];
        var result;
        var checkRequire = function(key, keyVal, val) {
            if(key === "required") {
                if(val === "") {
                    return false;
                }
                return true;
            }else if(key === "minlength") {
                if(val.length < keyVal) {
                    return false;
                }
                return true;
            }else if(key === "maxlength") {
                if(val.length > keyVal) {
                    return false;
                }
                return true;
            }else if(key === "regex") {
                var reg = new RegExp(keyVal);
                if(reg.test(val)) {
                    return true;
                }
                return false;
            }
        }

        for(var key in requirements){
            if(requirements.hasOwnProperty(key)){
                result[key] = checkRequire(key, requirements[key], val);
            }
        }

        return result;
    }

    sendFormData () {
        var formData = Object.assign({}, this.state.inputContent);
        var xmlhttp = new XMLHttpRequest();
        var _this = this;
        xmlhttp.onReadyStateChange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                if (xmlhttp.status === 200 && response.status === 'OK') {
                    newState = Object.assign({}, _this.state, {serverMsg : "gửi thông tin thành công"});
                    _this.setState(newState);
                }else{
                    newState = Object.assign({}, _this.state, {serverMsg : "rất tiếc, đã có lỗi xảy ra, xin hãy gửi lại"});
                    _this.setState(newState);
                }
            }  
        };
        xmlhttp.open('POST', 'send', true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(this.requestBuildQueryString(formData));
    }

    handleSubmit () {
        var result = true;
        for(var key in this.state) {
            if(this.state.hasOwnProperty(key)) {
                result = result && this.state[key];
            }
        }
        if(result === true){
            sendFormData(); 
        }else{
            alert("Vui lòng điền thông tin yêu cầu.");
        }
    }

    render () {
        var _this = this; 
        return (
            <div id="login" className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1" style={{display: 'none', cursor: 'default', backgroundColor: 'transparent'}}>
                <div className="iwrapper"  >
                    <form className="loginform" id="loginform" >
                        <p className="title">{this.props.title}</p>
                        <p>{this.state.subtitle}</p>
                        {this.props.items.map(function(item,i) {
                            return (
                            <div>
                                <h5>{item.label} </h5>
                                <Input type={item.type}  placeholder={item.pretext} name={item.id} _checkValidate={_this.checkValidate} _updateValidateState={_this.updateValidateState}/>
                                
                            </div>);
                        })}
                         
                        <BtSendInfo label="Send Information" formid="loginform" handleSubmit = {_this.handleSubmit}/>
                    </form>
                </div>
            </div>
        ) ;
    }    
}

class SubmitForm extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        var imgUrl = 'url(' + this.props.imgSrc + ')';
        var colSize = 12/this.props.items.length;
        var styleC = {
            backgroundImage: imgUrl,
            backgroundSize : 'cover'
        }; 
        return (
            <div id={this.props.idType} className="modal fade">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">{this.props.label}</h4>
                        </div>
                        <div className="modal-body">
                            <div className="panel panel-default" style={{backgroundImage: imgUrl, backgroundSize: 'cover'}}>
                                <div className="panel-body">
                                    <form class="submitform" id="submitform" className="row text-center">
                                        {this.props.items.map(function(item, i){
                                            var colType = "col-lg-" + colSize + " col-md-" + colSize + " col-sm-12 col-xs-12"
                                            if(item.label === "QUỐC GIA") {
                                                return (<div className={colType} style={{height :'150px'}}>
                                                            <h3>QUỐC GIA</h3>
                                                            <div id="input-ahead">
                                                                <input className="type-ahead form-control" type="text" placeholder={item.preText} name={item.id}/>
                                                                
                                                            </div>
                                                        </div>);
                                            }else{
                                                return(<div className={colType} style={{height :'150px'}}>
                                                            <h3>{item.label}</h3>
                                                            <input className="form-control" type="text" placeholder={item.preText} name={item.id}/>
                                                        </div>);
                                            }
                                            })}

                                    
                                        <div className="text-center">
                                            <BtSubmit label="đăng ký" form="submitform"/>
                                        </div>
                                    </form>
                                    
                                </div>
                                
                                
                            </div>
                            <div className="panel panel-success">
                                    <div className="panel-heading">
                                        Tài liệu cần có
                                    </div>
                                    <div className="pane-body" style={{maxHeight: '10', overflowY: 'scroll'}}> Panel Content 
                                    </div>
                            </div>
                            
                        </div>
                        <div className="modal-footer " style={{textAlign: 'center'}}>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>
         
            );
        }
    }

    class BtSendInfo extends Component{
        constructor (props) {
            super(props); 
        }

        handleClick () {
             
        }

        render () {
            return (
                <button class="submit" type="submit" form={this.props.formid} formMethod="post" id="btsendinfo" value="Submit" onClick={this.props.handleSubmit}>
                    <i className="spinner"></i>
                    <span className="state">{this.props.label}</span>
                </button>
            );
        }

    }

    class BtSubmit extends Component{
        constructor (props) {
            super(props);
        }
        render () {
            return (
                <button id="btsubmit" type="submit" form={this.props.formid} formMethod="post" >{this.props.label}</button>
            );
        }
    }




export default ServiceSection;
