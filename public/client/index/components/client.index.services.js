import React, {Component} from 'react';
import XRegExp from 'xregexp';

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
                <LoginForm prevSession={this.props.prevSession} title="Thông tin về bạn" subtitle=" Để đăng ký dịch vụ, vui lòng cung cấp các thông tin dưới đây, xin cảm ơn :)" items={[{label:"tên của bạn", pretext:"Họ và tên", type:"usrName", id:"usrname", labelClass: "fa fa-user"}, {label:"số điện thoại", pretext:"Số điện thoại", type:"usrSdt", id:"usrsdt", labelClass: "fa fa-phone"}]}/>

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
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleChange (event) {
        this.setState({isValidated: this.state.isValidated, content: event.target.value});
    }
    
    handleBlur () {
        var result = this.props.checkValidate(this.props.type, this.state.content);
        var resultOverall = true;
        var returnResult = new Object();
        this.state.msg="";
        var checkRequired = true;
        for(var key in result) {
            if(result.hasOwnProperty(key)) {
                resultOverall = resultOverall && result[key];
                if(key === "required" && result[key] === false) {
                    var newState = Object.assign({}, this.state, {msg : "Vui lòng điền thông tin yêu cầu."});
                    checkRequired = false;
                    this.setState(newState);
                }else{
                    if(result[key] === false && checkRequired ===true){
                        var newState = Object.assign({}, this.state, {msg : "Vui lòng nhập thông tin chính xác." });
                        this.setState(newState);
                    }
                }
            }
        }
        returnResult["validated"] = resultOverall;
        returnResult["content"] = this.state.content;
        this.props.updateValidateState(this.props.id, returnResult);
        this.setState({isValidated: result[1], content: this.state.content});
    }

    render() {
        var style = this.state.isValidated ? {display: 'none'} : {display : 'block'};
        return (
            <div>
                <input ref="refbutton"  type={this.props.type} className={this.props.class} placeholder={this.props.placeholder} value={this.state.content}  onChange={this.handleChange} onBlur={this.handleBlur} name={this.props.name}/>
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
        
        state["serverMsg"] = this.props.subtitle;
        state["inputContent"] = new Object();
        state["childValidated"] = new Object();
        this.props.items.forEach( function(item, index) {
            state["childValidated"][item.id] = false;
            state["inputContent"][item.id] = "";
        });
        state["reuseInfo"] = false;

        this.state = state; 
        this.updateValidateState = this.updateValidateState.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
        this.sendFormData = this.sendFormData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReSubmit = this.handleReSubmit.bind(this);
        this.handleNewSubmit = this.handleNewSubmit.bind(this);
        this.rules = {
            usrName : {
                required : true,
                minlength : 2,
                //regex : "^[a-z ,.'-]+$"
                regex :  "(?:[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*)"
            },
            usrSdt : {
                required : true,
                minlength : 7,
                maxlength : 11,
                regex : "^[0-9]+$"
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("Login Form log : Props update from father");
        console.log(nextProps.prevSession.content);
        if(nextProps.prevSession.content) {
            var newState = Object.assign({}, this.state, {reuseInfo : true});
            this.setState(newState);
        }else{
            var newState = Object.assign({}, this.state, {reuseInfo : false});
            this.setState(newState);
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    updateValidateState (inputId, status) {
        console.log("Update Parent State ", inputId);
        console.log(status);
        let newState = Object.assign({}, this.state);
        newState["childValidated"][inputId] = status.validated;
        newState["inputContent"][inputId] = status.content;
        this.setState(newState);
        
    }

    

    checkValidate (type, val) {
        console.log("type : ",type, "val : ", val, "\n");
        var requirements = this.rules[type];
        var result = new Object();
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
                var regex = new RegExp(keyVal);
                if(regex.test(val)) {
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
        console.log(result);

        return result;
    }

    sendFormData () {
        console.log("LoginForm : Send Form");
        var formData = Object.assign({}, this.state.inputContent);
        var xmlhttp = new XMLHttpRequest();
        var _this = this;
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                if (xmlhttp.status === 200 && response.status === 'OK') {
                    console.log("Gui thong tin thanh cong");
                    var newState = Object.assign({}, _this.state, {serverMsg : "gửi thông tin thành công"});
                    _this.setState(newState);
                    setTimeout(
                        function() { $('div#inputform').unblock() },
                        1000
                    );

                }else{
                    var newState = Object.assign({}, _this.state, {serverMsg : "rất tiếc, đã có lỗi xảy ra, xin hãy gửi lại"});
                    _this.setState(newState);
                }
            }  
        };
        xmlhttp.open('POST', '/customers/', true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(this.requestBuildQueryString(formData));
    }

    requestBuildQueryString (params) {
        var queryString = [];
        for(var property in params)
            if (params.hasOwnProperty(property)) {
                queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
            }
        return queryString.join('&');
    }

    handleSubmit () {
        var result = true;
        for(var key in this.state.childValidated) {
            if(this.state.childValidated.hasOwnProperty(key)) {
                result = result && this.state.childValidated[key];
            }
        }
        console.log("result ",result);
        var newState = Object.assign({}, this.state, {serverMsg : "Đang xử lý ... "});

        if(result === true){
            this.setState(newState, this.sendFormData()); 
        }else{
            newState = Object.assign({}, this.state, {serverMsg : "Thông tin bạn điền chưa chính xác, vui lòng bổ sung, cảm ơn <3"});
            this.setState(newState);
            
            //console.log(document.cookie);
            //alert("Vui lòng điền thông tin yêu cầu.");
            //window.location = "/#services";
        }
    }
    
    handleReSubmit () {
        var newState = Object.assign({}, this.state, {inputContent : {usrname : this.props.prevSession.content.usrname, usrsdt : this.props.prevSession.content.usrsdt}});
        this.setState(newState);
        setTimeout(
            function() { $('div#inputform').unblock() },
            1000
        );
        console.log("Submit previous session : OK");
    }

    handleNewSubmit () {
        var newState = Object.assign({}, this.state, {reuseInfo : false});
        this.setState(newState);
    }

    render () {
        var _this = this; 
         
        if(this.state.reuseInfo === true) {
            console.log("Input Form render notice : render prevSession");
            var Content = (
                <div>
                <p className="title">sử dụng thông tin ở giao dịch trước</p>
                <div className="inforbox">
                <p className="inforbox-title">Thông tin giao dịch trước của bạn</p>
                    <div >
                        <h5>Tên của bạn</h5>
                        <p>{this.props.prevSession.content.usrname}</p>
                    </div>
                    <div >
                        <h5>Số điện thoại</h5>
                        <p>{this.props.prevSession.content.usrsdt}</p>
                    </div>
                </div>
                    <BtSendInfo label="Sử dụng lại" formid="loginform" handleSubmit = {this.handleReSubmit}/>
                    <h5><a onClick={this.handleNewSubmit}>Ấn vào đây nếu bạn muốn nhập thông tin mới</a></h5>
                </div>
            );
        }else{
            var Content = (
                <div>
                    <p className="title">{this.props.title}</p>
                    <p>{this.state.serverMsg}</p>
                     {this.props.items.map(function(item,i) {
                        return (
                            <div>
                                <h5>{item.label} </h5>
                                <Input type={item.type}  id={item.id} placeholder={item.pretext} name={item.id} checkValidate={_this.checkValidate} updateValidateState={_this.updateValidateState} labelClass={item.labelClass}/>
                                    
                            </div>);
                    })}
                     <BtSendInfo label="Gửi thông tin" formid="loginform" handleSubmit = {this.handleSubmit}/>
                    
                </div>
                    );

        }
        return (
            <div id="login" className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1" style={{display: 'none', cursor: 'default', backgroundColor: 'transparent'}}>
                <div className="iwrapper"  >
                    <form className="loginform" id="loginform" >
                        {Content}
                    </form>
                </div>
            </div>
        ) ;
    }    
}

class SubmitForm extends Component {
    constructor(props) {
        super(props);
        this.updateValidateState = this.updateValidateState.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
        this.sendFormData = this.sendFormData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        var state ={inputContent : {}, childValidated : {}};
        
        this.props.items.forEach( function(item, index) {
            state["childValidated"][item.id] = false;
            state["inputContent"][item.id] = "";
        });
        state.serverMsg = {msgContent: "Vui lòng điền thông tin đăng ký dịch vụ", style : {color : 'green'} };

        this.state = state;
        this.rules = {
            tgc : {
                required : true,
                regex : "^[0-9]+$"
            },
            qg : {
                required : true,
                minlength : 3,
                //regex : "^[a-z ,.'-]+$"
                regex : "(?:[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+[\sa-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*)"
            },
            sl :{
                required : true,
                regex : "^[0-9]+$"
            },
            xgh : {
                maxlength : 2,
                required :  true,
                regex : "^[0-9]+$"
            }
        };
    }

    updateValidateState (inputId, status) {
        console.log("SubmitForm : Update Parent State ", inputId);
        console.log(status);
        let newState = Object.assign({}, this.state);
        newState["childValidated"][inputId] = status.validated;
        newState["inputContent"][inputId] = status.content;
        this.setState(newState);
    }
    
    checkValidate (type, val) {
        console.log("type : ",type, "val : ", val, "\n");
        var requirements = this.rules[type];
        var result = new Object();
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
                var regex = new RegExp(keyVal)
                if(regex.test(val)) {
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
        console.log(result);

        return result;
    }
    

    sendFormData () {
        console.log("LoginForm : Send Form");
        var formData = Object.assign({}, this.state.inputContent);
        var xmlhttp = new XMLHttpRequest();
        var _this = this;
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                if (xmlhttp.status === 200 && response.status === 'OK') {
                    console.log("Gui thong tin thanh cong");
                    var newState = Object.assign({}, _this.state, {serverMsg : {msgContent : "gửi thông tin thành công :)", style : {color : 'green'}}});
                    _this.setState(newState);
                    setTimeout(
                        function() { $('div#inputform').unblock() },
                        1000
                    );

                }else{
                    var newState = Object.assign({}, _this.state, {serverMsg : {msgContent : "rất tiếc, đã có lỗi xảy ra, xin hãy gửi lại", style: {color: 'red'}}});
                    _this.setState(newState);
                }
            }  
        };
        xmlhttp.open('POST', '/customers/submitOrder/', true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(this.requestBuildQueryString(formData));
    }

    requestBuildQueryString (params) {
        var queryString = [];
        for(var property in params)
            if (params.hasOwnProperty(property)) {
                queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
            }
        return queryString.join('&');
    }
    
    handleSubmit() {
        var result = true;
        for(var key in this.state.childValidated) {
            if(this.state.childValidated.hasOwnProperty(key)) {
                result = result && this.state.childValidated[key];
            }
        }
        console.log("result ",result);
        var newState = Object.assign({}, this.state, {serverMsg : {msgContent : "Đang xử lý ... ", style :{color : 'blue'}}});

        if(result === true){
            this.setState(newState, this.sendFormData()); 
        }else{
            newState = Object.assign({}, this.state, {serverMsg : {msgContent : "Thông tin bạn điền chưa chính xác, vui lòng bổ sung, cảm ơn <3", style : {color : 'red'}}});
            this.setState(newState);
            
            //console.log(document.cookie);
            //alert("Vui lòng điền thông tin yêu cầu.");
            //window.location = "/#services";
        }
    }
    render () {
        var imgUrl = 'url(' + this.props.imgSrc + ')';
        var colSize = 12/this.props.items.length;
        var styleC = {
            backgroundImage: imgUrl,
            backgroundSize : 'cover'
        }; 
        var _this = this;
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
                                    <form className="submitform" id="submitform" className="row text-center">
                                        {this.props.items.map(function(item, i){
                                            var colType = "col-lg-" + colSize + " col-md-" + colSize + " col-sm-12 col-xs-12"
                                            if(item.label === "QUỐC GIA") {
                                                return (<div className={colType} style={{height :'150px'}}>
                                                            <h3>QUỐC GIA</h3>
                                                            <div id="input-ahead">
                                                                <Input class="type-ahead form-control" type="qg" placeholder={item.preText} id={item.id} checkValidate={_this.checkValidate} updateValidateState={_this.updateValidateState}/>
                                                                
                                                            </div>
                                                        </div>);
                                            }else{
                                                return(<div className={colType} style={{height :'150px'}}>
                                                            <h3>{item.label}</h3>
                                                            <Input class="form-control" type={item.id} placeholder={item.preText} id={item.id} checkValidate={_this.checkValidate} updateValidateState={_this.updateValidateState}/>
                                                        </div>);
                                            }
                                            })}

                                    
                                        <div className="text-center">
                                            <p style={this.state.serverMsg.style}>{this.state.serverMsg.msgContent}</p>
                                            <BtSubmit label="đăng ký" form="submitform" handleSubmit={this.handleSubmit}/>
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
            console.log("OK"); 
        }

        render () {
            return (
                <button  type="button" id="btsendinfo" value="Submit" onClick={this.props.handleSubmit }>
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
                <button id="btsubmit" type="button" value="Submit" onClick={this.props.handleSubmit }>{this.props.label}</button>
            );
        }
    }




export default ServiceSection;
