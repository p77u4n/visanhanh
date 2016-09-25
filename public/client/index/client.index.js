import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AboutmeSection from './components/client.index.aboutme';
import ServiceSection from './components/client.index.services';

class IndexComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {prevSession : {content : null}};
    } 
    componentWillMount() {
        var xmlhttp = new XMLHttpRequest();
        var _this = this;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                if(xmlhttp.status === 200 && response.status === 'OK') {
                    _this.setState({prevSession : {content : response.session.customerInfo}}); 
                    console.log("Session Retrieving Notice : familiar Session ", _this.state.prevSession.content);
                } else if (xmlhttp.status === 200 && response.status === 'NONE') {
                    _this.setState({prevSession : {content : null}});
                    console.log("Session Retrieving Warning : new come Session");
                } else {
                    _this.setState({prevSession : {content : null}});
                    console.log("Session Retrieving Warning : Cannot receive Session from Server");
                }
            }
        }
        xmlhttp.open('GET','/session/', true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send();
        console.log("Send Request");
    }
    render() {
        return (
            <div>
                <AboutmeSection />
                <ServiceSection prevSession={this.state.prevSession}/>   
            </div>
        );
    }
}

ReactDOM.render(<IndexComponent />, document.getElementById('root'));
console.log("client.index.js render done");

