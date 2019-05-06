import React from "react";
import PropTypes from "prop-types";
// import withStyles from "isomorphic-style-loader/lib/withStyles";
import cn from "classnames";
import s from "./Radio.scss";

class Radio extends React.PureComponent {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    id: PropTypes.string.isRequired,
    defaultChecked: PropTypes.bool,
  };

  static defaultProps = {
    defaultChecked: false
  };


  constructor(props) {
    super(props);

    this.renderCheckboxIcon = this.renderCheckboxIcon.bind(this);
  }


  renderCheckboxIcon(){
    return this.props.checked ? (
      <i className="material-icons">radio_button_checked</i>
    ):(
      <i className="material-icons">radio_button_unchecked</i>
    )
  }

  render() {
    const { id, className, value, label, name, activeClassName, checked } = this.props;

    let classes = cn(
      s.root, 
      className,
      checked && activeClassName,
    );

    return (
      <div className={`${classes}`}>
        <label htmlFor={id}>
          { this.renderCheckboxIcon() }
          {label}
        </label>
        <input id={id} name={name} type="radio" value={value} onChange={this.props.onChange.bind(this)} />
      </div>
    );
  }
}

export default Radio;
