import React, {Component} from 'react';
import * as Utils from './utils';
import LootSearch from './LootSearch';

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {data: {}};
    }
    
    componentDidMount() {
        Utils.getInitialData().then((data) => {
            this.setState({data: data});
        });
    }
    
    render () {
        let data = <p>{JSON.stringify(this.state.data)}</p>;

        let searchInput = this.state.data.itemNames ?
            <LootSearch names={this.state.data.itemNames} /> :
            null;

        return <div>
            <h2>Warframe Loot Lookup</h2>
            {searchInput}
        </div>;
    }
}

