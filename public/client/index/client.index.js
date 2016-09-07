
import React from 'react';
import ReactDom from 'react-dom';
import AboutmeSection from './components/client.index.aboutme';
import ServiceSection from './components/client.index.services';

var IndexComponent = React.createClass({
    render: function() {
        return (
            <div>
                <AboutmeSection />
                <ServiceSection />    
            </div>
        );
    }
})

React.render(<IndexComponent/>, document.getElementById('root'));
console.log("client.index.js render done");

