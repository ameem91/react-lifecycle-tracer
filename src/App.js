import React, { Component } from 'react';

/* global chrome */
function connectToBackground() {
  const connection = chrome.runtime.connect({
    name: "devtools-page"
  });

  connection.postMessage({
    name: "INIT",
    tabId: chrome.devtools.inspectedWindow.tabId
  });

  return connection;
}
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: []
    };

    this.renderEvents = this.renderEvents.bind(this);
  }

  renderEvents() {
    return this.state.events.map((event, index) => (
      <tr key={index}>
        <td>{event.component}</td>
        <td>{event.method}</td>
      </tr>
    ));
  }

  componentDidMount() {
    const connection = connectToBackground();
    connection.onMessage.addListener(message => {
      if (message.name === "__REACT_LIFECYCLE_TRACER_EVENT__") {
        this.setState({ events: [...this.state.events, message.payload] });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>React Lifecycle Tracer</h1>
        <table>
          <tr>
            <th>Component</th>
            <th>Lifecycle Method</th>
          </tr>
          {this.renderEvents()}
        </table>
      </div>
    );
  }
}

export default App;
