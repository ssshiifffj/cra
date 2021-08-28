import React, { Component, memo } from 'react';

export default class Redis extends Component {


render() {

    return (
        <div className={"redis_wrapper"}>
            <ul>
                <h4>Calculated Values</h4>
                {
                Object.entries(this.props.calculated).map((item, index) => {
                return <li key={item[0]}>For index {item[0]} i calculated {item[1]}</li>
                })
				}
            </ul>
        </div>
    );
}
}