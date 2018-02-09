import React, {Component} from 'react';
import * as Utils from './utils';
import LootSearch from './LootSearch';
import MissionRewards from './MissionRewards';

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {data: {}, selection: null};
    }
    
    selectionChanged = (selection) => { //Only updates if the user actually clicks a valid suggested item
        this.setState({selection: selection});
    }
    
    componentDidMount() {
        Utils.getInitialData().then((data) => {
            this.setState({data: data});
        });
    }
    
    render () {
        let currentItem = this.state.selection ? this.state.data.items[this.state.selection] : null;
        
        let searchInput = this.state.data.itemNames ?
            <LootSearch names={this.state.data.itemNames} selectionCallback={this.selectionChanged} /> :
            null;

        let lootTables = null;
        if(currentItem) { //Only display tables if an item is selected
            lootTables = <div>
                {currentItem.missionRewards.length > 0 ? <MissionRewards data={currentItem.missionRewards} /> : null}
            </div>;
        }

        return <div className="container">
            <h2>Warframe Loot Lookup</h2>
            {searchInput}
            
            <h3>{this.state.selection}</h3>
            {lootTables}
        </div>;
    }
}

