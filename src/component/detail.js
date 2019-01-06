import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import cn from "classnames";
import "./detail.css";

class Detail extends Component {
  render() {
    const { componentName, methodName, state, props, className } = this.props;
    return (
      <div className={cn("detail", className)}>
        {componentName && (
          <h2 className="detail__header">{`${componentName}- ${methodName}`}</h2>
        )}
        {state && (
          <ReactJson
            src={state}
            name="state"
            theme="bright:inverted"
            enableClipboard={false}
            style={{ "font-family": "inherit" }}
          />
        )}
        {props && (
          <ReactJson
            src={props}
            name="props"
            theme="bright:inverted"
            enableClipboard={false}
            style={{ "font-family": "inherit" }}
          />
        )}
      </div>
    );
  }
}

Detail.propTypes = {
  props: PropTypes.object,
  state: PropTypes.object,
  componentName: PropTypes.string,
  methodName: PropTypes.string,
  className: PropTypes.string
};

export default Detail;
