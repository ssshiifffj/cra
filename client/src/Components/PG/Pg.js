import React, { Component, memo } from 'react';
import './pg.css';

class Pg extends Component {


    render() {

        return (
            <div className={"pg_wrapper"}>
                <h4>Indicies i have seen:</h4>
                <ul className={"seen"}>
                { this.props.seen.map(({number}, index) => {
                    return <li key={number + 0.5*Math.random()}>{number}</li>
                }) }
                </ul>
            </div>
        );
    }
}

export default memo(Pg);