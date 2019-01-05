import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import cn from "classnames";
import "./detail.css";

class Detail extends Component {
  render() {
    const { componentName, state, props, className } = this.props;
    return (
      <div className={cn('detail', className)}>
        <h2>{componentName}</h2>
        {
          <ReactJson
            src={state}
            name="state"
            theme="bright:inverted"
            enableClipboard={false}
          />
        }
        {
          <ReactJson
            src={props}
            name="props"
            theme="bright:inverted"
            enableClipboard={false}
          />
        }
      </div>
    );
  }
}

Detail.defaultProps = {
  componentName: "I AM NOTHING",
  className: ""
};

Detail.propTypes = {
  props: PropTypes.object,
  state: PropTypes.object,
  componentName: PropTypes.string,
  className: PropTypes.string
};

export default Detail;
