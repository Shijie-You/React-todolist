import React, { Component } from 'react';
import InputSection from './InputSection.js';
import LiInput from './LiInput.js';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,                       // 为每个数据设置一个不重复的ID
            inputSetValueArray: [],      // 存取的数据包含ID completed title
            dbClick: false,              // 是否在双击状态下
            classNameHandle: 0,          // 取得被双击的li标签的ID
            currentStatus: 'all',


        };
        this.inputSetValue = this.inputSetValue.bind(this);
        this.inputValue = this.inputValue.bind(this);
        this.changeDBClick = this.changeDBClick.bind(this);
        this.changeCompleted = this.changeCompleted.bind(this);
    }


    // COPY state-> Array

    //传入子组件调用而后修改父组件的state 得到每次输入的值
    inputSetValue (inputValue) {
        let arrayinputv = JSON.parse(JSON.stringify(this.state.inputSetValueArray));
        let idcopy = this.state.id;
        let newclass = {
            id: idcopy,
            title: inputValue,
            completed: false,

        };

        arrayinputv.push(newclass);
        this.setState({
                inputSetValueArray: arrayinputv,
                id: ++idcopy
        });
    }


     inputValue(e, index) {
         let arrayinputv = JSON.parse(JSON.stringify(this.state.inputSetValueArray));
         if (e.target.value!=='') {
             arrayinputv[index].title = e.target.value;
             this.setState({ inputSetValueArray: arrayinputv })
         } else {
             this.deleteLi(e, index)
         }
     };

    // 改变 dbclick值从而决定如何渲染样式
    changeDBClick() {
        let dbClick = this.state.dbClick;
        this.setState({ dbClick: !dbClick });

    }

    // input点击修改completed
    changeCompleted(index) {
        let arrayinputv = JSON.parse(JSON.stringify(this.state.inputSetValueArray));
        arrayinputv[index].completed = !arrayinputv[index].completed;
        this.setState({ inputSetValueArray: arrayinputv });

}

    // 判断双击元素ID
    itemIDTest(e) {
        if (e) {
           this.setState({ classNameHandle: e.target.id });
        }
    }

    //button 删除自身
    deleteLi(index) {
        let arrayinputv = JSON.parse(JSON.stringify(this.state.inputSetValueArray));
        const filter = arrayinputv.filter(item => item.id !== index);
        this.setState({ inputSetValueArray: filter });
    }

    // 改变所有的completed状态
    checkAllLabel() {
        let arrayinputv = JSON.parse(JSON.stringify(this.state.inputSetValueArray));
        if (arrayinputv.every(item => item.completed === true)) {
           arrayinputv.forEach(item => item.completed = false)
        } else arrayinputv.forEach(item => item.completed = true);
        this.setState({ inputSetValueArray: arrayinputv });
    }


    // 点击 All Button
    changeCurrentStatus(current) {
        this.setState({ currentStatus: current });
    }

    clearCompleted() {
        const arrayinputv = JSON.parse(JSON.stringify(this.state.inputSetValueArray));
        const cLearcompleted = arrayinputv.filter(item => item.completed === false);
        this.setState({ inputSetValueArray: cLearcompleted });
    }

    render() {
        const arrayinputv = JSON.parse(JSON.stringify(this.state.inputSetValueArray));
        const completed = arrayinputv.filter(item => item.completed === true);
        const Active = arrayinputv.filter(item => item.completed === false);
        const length = this.state.inputSetValueArray.length;
        const arr = {
            'all': arrayinputv,
            'active': Active ,
            'completed':completed,
        };

        return (
            <div className="container">
                <header className="todo-header"><h1>ToDoList</h1></header>
                <section className="input-section">
                    <div className="input-wrap">
                        <InputSection  inputSetValue={this.inputSetValue}/>
                        <input className="check-all-input" type="checkBox"/>
                        <label className={length < 1 ? 'check-all-label li-input-text-db' : 'check-all-label'}
                               onClick={() => this.checkAllLabel()}
                        />
                        <ul className="liStyle">
                            {arr[this.state.currentStatus].map(
                                (item, index) => {
                                    return(
                                        <li key={item.id}>
                                            <div className="view">
                                                <input
                                                    checked={item.completed}
                                                    onChange={() => this.changeCompleted(index)}
                                                    className="li-input"
                                                    type="checkbox"
                                                />
                                                <label
                                                    className={this.state.dbClick && index.toString() === this.state.classNameHandle  ? 'label-change li-input-text-db' : 'label-change'}
                                                    id={index}
                                                    onDoubleClick={
                                                    e => {
                                                        this.changeDBClick(e);
                                                        this.itemIDTest(e);
                                                    }
                                                }
                                                >{item.title}</label>
                                                <button
                                                    className="destory"
                                                    onClick={() => this.deleteLi(item.id)}
                                                />
                                            </div>
                                            <LiInput
                                                value={item.title}
                                                className="li-input-text"
                                                changeDBClick={this.changeDBClick}
                                                classNameHandle={this.state.classNameHandle}
                                                dbClick={this.state.dbClick}
                                                index={index}
                                                inputValue={this.inputValue}
                                            />
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                        <footer className={ length < 1? 'button-section li-input-text-db':'button-section' }>
                            <span className="item-span">
                                {length}
                                {length >1 ? ' items left' : ' item left'}
                                </span>
                            <ul className="click-button">
                                <li
                                    onClick={() => this.changeCurrentStatus('all')}
                                >All</li>
                                <li
                                    onClick={() => this.changeCurrentStatus('active')}
                                >Active</li>
                                <li
                                    onClick={() => this.changeCurrentStatus('completed')}
                                >Completed</li>
                            </ul>
                            <button
                                className = "clear-button"
                                onClick={() => this.clearCompleted()}
                            >Clear Completed</button>
                        </footer>
                    </div>
                </section>
                <footer className="footer-im"/>
            </div>
        );
    }
}

export default App;
