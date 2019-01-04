import React, { Component } from "react";
import { Table } from "reactable";
import Detail from "../component/detail"

import './app.css';

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
    const data = this.state.events.map((event, index) => ({
      index,
      component: event.component,
      method: event.method,
    }));

    return <Table data={data} filterable={['method', 'component']}/>
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
      <div className="app">
        <table className="table">
          <tr>
            <th>Component</th>
            <th>Lifecycle Method</th>
            <th>State</th>
          </tr>
          {this.renderEvents()}
        </table>
        <Detail className="detail"/>
      </div>
    );
  }
}

export default App;
