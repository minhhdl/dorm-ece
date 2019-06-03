import React from "react";
import PropTypes from "prop-types";
// import withStyles from "isomorphic-style-loader/lib/withStyles";
import cn from "classnames";
import s from "./Button.scss";

class Button extends React.PureComponent {
  static propTypes = {
    clear: PropTypes.bool,
    outline: PropTypes.bool,
    iconLeft: PropTypes.bool,
    iconRight: PropTypes.bool,
    color: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };

  static defaultProps = {
    iconLeft: false,
    iconRight: false,
    clear: false,
    outline: false,
    color: null,
    component: 'button',
  };

  getColorClass() {
    let {color} = this.props;
    let className = "";
    switch(color) {
      case "dark-grey": className = s["button-dark-grey"]; break;
      case "light-grey": className = s["button-light-grey"]; break;
      case "header": className = s["button-color-header"]; break;
      case "white": className = s["button-color-white"]; break;
      case "danger": className = s["button-color-danger"]; break;
    }
    return className;
  }

  render() {
    const { component, clear, color, outline, iconLeft, autoWidth, fullWidth, iconRight, className, children, ...otherProps } = this.props;
    let classes = cn(
      s.root, 
      iconLeft && s["icon-left"],
      iconRight && s["icon-right"],
      clear && s["button-clear"],
      color && this.getColorClass(color),
      outline && s["button-outline"],
      autoWidth && s["auto-width"],
      fullWidth && s["full-width"],
      className
    );

    const Component = component || 'button';

    return (
      <Component className={`${classes}`} {...otherProps}>
        {children}
      </Component>
    );
  }
}

export default Button;
