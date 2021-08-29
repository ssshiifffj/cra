import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Form from '../Form/Form';
import Pg from '../PG/Pg';
import Redis from '../Redis/Redis';
import './App.css';

class App extends Component {
  state = {
    seen: [],
    calculated: {},
  }

   componentDidMount() {
     try {
     this.fetchCalculated();
     this.fetchIndexes();
     }catch(err) {
       console.log('error occured in componentdidMount');
     }
   }

    fetchCalculated = () => {
     fetch('/api/values/redis')
      .then((headers) => (headers.json()))
      .then((calculated) => {
        this.setState((currentState, currentProps) => {
          return  { calculated:  calculated}
        });
      })     
      .catch((err) => console.log(err.message));

      
   }

   fetchIndexes = () => {
     fetch('/api/values/pg')
     .then((headers) => headers.json())
     .then((indexes) => {
       this.setState((currentState, currentProps) => {
         return { seen: indexes}
       })
     })
   }

  render() {
    return (
      <div className="app_wrapper" >
          <Footer />
          <Form fetchCalculated={this.fetchCalculated} fetchIndexes={this.fetchIndexes}/>
          <Pg seen={this.state.seen}/>
          <Redis calculated={this.state.calculated}/>
      </div>
    );
  }
}

export default App;

// Dockerizing multiple Services