/* eslint-disable css-modules/no-undef-class */

import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
// import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "../sass/Grid.scss";

class Container extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    fluid: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    fluid: false,
  };

  render() {
    const { className, children, fluid, ...other } = this.props;

    const classname = cn(fluid ? s["container-fluid"] : s["container"], className);

    return (
      <div className={classname} {...other}>
        {children}
      </div>
    );
  }
}

export default Container;
