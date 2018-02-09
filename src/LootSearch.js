import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import { Input, DropdownMenu, DropdownItem } from 'reactstrap';

export default class LootSearch extends Component {
    constructor(props) {
        super(props);
        
        this.state = {currentValue: "", suggestions: []};
    }
    
    //Much of this is boilerplate React Autosuggest code
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    }
    
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }
    
    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.props.names.filter(name =>
            name.toLowerCase().slice(0, inputLength) === inputValue
        );
    }
    
    getSuggestionValue(suggestion) { 
        return suggestion;
    }
    
    onChange = (event, { newValue }) => {
        this.setState({
            currentValue: newValue
        });
    }
    
    render () {
        const renderSuggestion = (suggestion) => {
            return <div>
                    {suggestion}
                </div>           
        };

        const inputProps = {
            placeholder: 'Type an item name',
            value: this.state.currentValue,
            onChange: this.onChange
        };

        return <div>
            <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />               
        </div>;
    }
}

