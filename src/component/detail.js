import React, { Component } from "react";
import PropTypes from "prop-types";
import JSONTree from "react-json-tree";

class Detail extends Component {

  isEmpty = (item) =>{
    return Object.keys(item).length > 0
  }

  render() {
    const { componentName, state, props } = this.props;
    const { isEmpty } = this
    return (
      <div>
        <h2>{componentName}</h2>
        { 
          isEmpty(state) && <JSONTree data={state} invertTheme={true}/>
        }{
          isEmpty(props) && <JSONTree data={props} invertTheme={true}/>
        }
      </div>
    );
  }
}

Detail.defaultProps = {
  props: {},
  state: {},
  componentName: "I AM NOTHING"
};

Detail.propTypes = {
  props: PropTypes.object,
  state: PropTypes.object,
  componentName: PropTypes.string,
};

export default Detail;
