import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this); //makes addFish() a method on App
    this.loadSamples = this.loadSamples.bind(this);

    // getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    // update state
    //   this.state.fishes.fish1 = fish; <--can do this, but don't
    //   Spread Attributes: if you have props as an object and want to pass it in JSX, you can use ... as a “spread” operator to pass whole props object.
    const fishes = {...this.state.fishes}; //copy existing state into "fishes"

    // add our new fish
    const timestamp = Date.now(); // ms since the UNIX epoch (1/1/1970)
    fishes[`fish-${timestamp}`] = fish;

    // set state. Updates App.state
    this.setState({ fishes }); //shortcut for line below
    // this.setState({ fishes: fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
                    .map(key => <Fish key={key} details={this.state.fishes[key]} />)
            }
          </ul>
        </div>
        <Order />
      { /* pass addFish(), loadSamples() to Inventory */ }
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;
