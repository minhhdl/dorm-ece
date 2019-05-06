import React from 'react';
import PropTypes from 'prop-types';
// import withStyles from "isomorphic-style-loader/lib/withStyles";
import cn from 'classnames';
import s from './Checkbox.scss';

class Checkbox extends React.Component {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    checked: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    color: PropTypes.string
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.checked || false,
    };
  }

  onChange(event) {
    this.setState({ isChecked: event.target.checked }, () => {
      if (this.props.onChange) this.props.onChange(event);
    });
  }

  renderCheckboxIcon() {
    return this.props.checked ? (
      <i className="material-icons">check_box_outline</i>
    ) : (
      <i className="material-icons">check_box_outline_blank</i>
    );
  }

  render() {
    const {
      id, className, checked, label, color,
    } = this.props;

    const classes = cn(
      s.root,
      className,
      (color == "white") && s["color-white"]
    );

    return (
      <div className={`${classes}`}>
        <label htmlFor={id}>
          { this.renderCheckboxIcon() }
          {label}
        </label>
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default Checkbox;
