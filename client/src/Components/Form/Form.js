import React, { Component, createRef } from 'react';
import './form.css';

export default class Form extends Component {

    constructor(props) {
        super(props);
        this.input = createRef();
    }
    handleSubmit(e) {
        e.preventDefault();
        try {
            const originalValue = this.input.current.value;
            const value = Number(originalValue);
            if (value) {
                fetch('/api/values', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({index: value})
                }
                
                )
                .then((headers) => (headers.json()))
                .then((res) => {
                    if (res.success) {
                        return new Promise(function(resolve, reject) {
                            window.setTimeout(() => {
                                resolve('')
                            }, 500)
                        })
                    }
                })
                .then((res) => {
                    this.props.fetchIndexes();
                    this.props.fetchCalculated();
                    this.input.current.value = '';
                })
                .catch((err) => alert("error: " + err.message));
            }
            else throw new Error(`${originalValue} is not a number̀`);
        }catch(err) {
            alert(err.message)
        }
    }

    render() {

        return (
            <div className={"form_wrapper"}>
                <form className={"form"}>
                    <label >Enter Your Index</label>
                    <input ref={this.input} type="text"/>
                    <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                </form>
            </div>
        )
    }
}