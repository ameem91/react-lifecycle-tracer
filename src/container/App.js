import React, { Component } from "react";
import Detail from "../component/detail";
import Events from "../component/events";

import "./app.css";

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
      events: [],
      selectedRowIndex: -1
    };

    this.renderEvents = this.renderEvents.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick(index) {
    this.setState({ selectedRowIndex: index });
  }

  renderEvents() {
    const { events } = this.state;
    const data = events.map((event, index) => ({
      id: events.length - index,
      component: event.component,
      method: event.method
    }));

    return <Events events={data} onRowClick={this.handleRowClick} />;
  }

  componentDidMount() {
    const connection = connectToBackground();
    connection.onMessage.addListener(message => {
      if (message.name === "__REACT_LIFECYCLE_TRACER_EVENT__") {
        this.setState({ events: [message.payload, ...this.state.events] });
      }
    });
  }

  render() {
    const { selectedRowIndex, events } = this.state;
    const selectedEvent = events[selectedRowIndex];
    const state = selectedEvent && selectedEvent.state;
    const componentName = selectedEvent && selectedEvent.component;

    return (
      <div className="app">
        {this.renderEvents()}
        <Detail state={state} componentName={componentName} />
      </div>
    );
  }
}

export default App;
