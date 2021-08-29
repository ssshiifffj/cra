import React, { Component, memo } from 'react';
import './footer.css';

class Footer extends Component {

    render() {
        return (
            <div className={"footer_wrapper"} >
                <h1>Fib Calculator</h1>
                <div data-testid="apptest">hola</div>
            </div>
        )
    }
}

export { Footer as default };

// 11. Fetching Date in the React App