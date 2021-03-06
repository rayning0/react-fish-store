import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    //For updateFish, removeFish, loadSamples we try experimental ES6 feature:
    //Property Initializers, so no need for lines 18-20:
    // https://www.fullstackreact.com/articles/use-property-initializers-for-cleaner-react-components/

    this.addFish = this.addFish.bind(this); //makes addFish() a method on App
    // this.updateFish = this.updateFish.bind(this);
    // this.removeFish = this.removeFish.bind(this);
    // this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

// Instead of lines 25-28, we may do this outside constructor:
  // state = {
  //   fishes: {},
  //   order: {}
  // }

  componentWillMount() {
    // runs right before app is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // check if any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if(localStorageRef) {
      // update App component's "order" state, on page reload, etc.
      this.setState({
        order: JSON.parse(localStorageRef)  //change JSON string back to object
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    // stringify order because localStorage only holds strings, not objects
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish(fish) {
    // update state
    //   this.state.fishes.fish1 = fish; <--can do this, but don't
    // Spread Attributes: if you have props as an object and want to pass it in JSX,
    // use ... as “spread” operator to pass whole props object.

    //copy existing state into "fishes"
    const fishes = {...this.state.fishes};

    // add our new fish
    const timestamp = Date.now(); // ms since the UNIX epoch (1/1/1970)
    fishes[`fish-${timestamp}`] = fish;

    // set state. Updates App.state
    this.setState({ fishes }); //shortcut for line below
    // this.setState({ fishes: fishes });
  }

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  removeFish = (key) => {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  };

  // loadSamples = function() {  OR
  loadSamples = () => { // arrow function makes loadSamples bound to parent App
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder(key) {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1; // # of orders of a specific fish
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
                    .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />) //index is for you. key is for React.
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
      { /* pass addFish(), loadSamples(), etc. to Inventory */ }
        <Inventory
          addFish={this.addFish}
          removeFish={this.removeFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          storeId={this.props.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default App;
