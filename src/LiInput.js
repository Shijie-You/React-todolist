import React, { Component } from'react';
import './App.css';

class LiInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
               inputValue: '',
            };

            this.enterChangeValue = this.enterChangeValue.bind(this);
            this.onBlurInput = this.onBlurInput.bind(this);

    }

    // enter键改变样式
    enterChangeValue(e) {
        if (e.keyCode === 13 && this.props.dbClick) {
           this.props.changeDBClick();
        }
    }

    // 展示效果下如果失去焦点就改变
    onBlurInput() {
        if (this.props.dbClick) {
            this.props.changeDBClick();
        }
    }

    render() {
        const className = this.props.dbClick && this.props.index.toString() === this.props.classNameHandle  ?  ' li-input-text-db-block' : '';
        return(
            <div>
                <input
                    autoFocus={(!!this.props.dbClick)}
                    value={this.props.value}
                    className={this.props.className + className}
                    onChange={(e) => this.props.inputValue(e, this.props.index)}
                    onKeyUp={(e) =>  this.enterChangeValue(e) }
                    onBlur={() => this.onBlurInput()}
                />
            </div>
        )
    }

}

export default  LiInput;