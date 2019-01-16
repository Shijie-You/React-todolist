import React, { Component } from 'react';
import './App.css';

class InputSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue : '',
        };
        this.inputChange = this.inputChange.bind(this);
        this.clearInputValue = this.clearInputValue.bind(this);
        this.keyCodeText = this.keyCodeText.bind(this);
    }

    //input改变
    inputChange(e) {
        this.setState({ inputValue: e.target.value })
    }

    //监听enter并调用设置在父组件内
    keyCodeText(e) {
        if (e.keyCode === 13 && (this.state.inputValue !== '')) {
            this.props.inputSetValue(this.state.inputValue);
            this.clearInputValue();
        }
    }

    clearInputValue() {
        this.setState( {inputValue: ''} )
    }

    render() {
        return(
            <div>
                <input
                    autoFocus={true}
                    className="input-change"
                    placeholder='what needs to be done?'
                    value={this.state.inputValue}
                    onKeyUp={(e) => this.keyCodeText(e)}
                    onChange={(e) => this.inputChange(e)}
                />
            </div>
        )
    }
}

export default InputSection;
