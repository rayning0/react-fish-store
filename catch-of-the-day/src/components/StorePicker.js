import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(event) {
    event.preventDefault(); // stop page from reloading
    console.log("You changed the URL");
    // grab text from textbox
    console.log(this.storeInput.value);
    // change route from / to /store/:storeId
  }

  render() {  //render() is bound to the component
    return (
      // This line defines "this" as StorePicker and binds goToStore() to "this"
      // <form className="store-selector" onSubmit={this.goToStore.bind(this)}>

      // OR this ES6 arrow function follows LEXICAL SCOPE (automatically setting
      // "this" to StorePicker), with NO need for binding
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter A Store</h2>

      { /* This "ref" make "storeInput" property and sets it to "input" HTML tag */ }
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker;
