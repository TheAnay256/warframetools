import React, {Component} from 'react';
import * as Utils from './utils';

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {data: {}};
    }
    
    componentWillMount() {
        Utils.getInitialData().then((data) => {
            this.setState({data: data});
        });
    }
    
    render () {
        return <p>{JSON.stringify(this.state.data)}</p>
    }
}
