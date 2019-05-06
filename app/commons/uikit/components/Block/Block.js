import React from "react";
import PropTypes from "prop-types";
// import withStyles from "isomorphic-style-loader/lib/withStyles";
import cn from "classnames";
import Button from "../Button";
import s from "./Block.scss";

class Block extends React.PureComponent {
  static propTypes = {
    rightButtons: PropTypes.arrayOf(PropTypes.node)
  };

  static defaultProps = {
    rightButtons: []
  };

  renderHeader() {
    const {noHeader, icon, title, rightButtons} = this.props;
    return !noHeader && (
      <div className={s["block-header"]}>
        <h3 className={s["block-title"]}>
          {icon && <i className="material-icons">{icon}</i>}
          {title}
        </h3>
        {this.renderRightButtons()}
      </div>
    )
  }

  renderRightButtons() {
    const {rightButtons} = this.props;

    return (rightButtons.length > 0) && (
      <div className={s["right-buttons"]}>
        {rightButtons}
      </div>
    )
  }

  render() {
    const { className, style, children } = this.props;
    let classes = cn(
      s.block,
      className
    );

    return (
      <div className={`${classes}`} style={style}>
        {this.renderHeader()}
        {children}
      </div>
    );
  }
}

export default Block;
