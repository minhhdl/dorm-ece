
import React from 'react';
import PropTypes from 'prop-types';

class RadioGroup extends React.Component {

  handleRadioChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  };

  render() {
    const { children, name, value, onChange, ...other } = this.props;

    return (
      <div {...other}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child, {
            key: index,
            name,
            checked: value === child.props.value,
            onChange: this.handleRadioChange,
          });
        })}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default RadioGroup;