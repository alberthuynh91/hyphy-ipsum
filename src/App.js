import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: '',
      hyphy: [],
      loremIpsumText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`/api/hyphy`)
      .then(response => response.json())
      .then(state => this.setState(state))
  }

  generateIpsum = () => {
    const shuffledArray = shuffle(this.state.hyphy)
    const loremIpsumText = shuffledArray.join(' ')
    this.setState({ 
      hyphy: shuffledArray,
      loremIpsumText
    })
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }

    render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="text-container">
            <div className="ipsum-text">{this.state.loremIpsumText}</div>
          </p>
          <button onClick={() => { this.generateIpsum() }}>Ghost ride the whip</button>
        </header>
      </div>
    );
  }
}

export default App;
