import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { Async, components } from 'react-select';

import cn from 'classnames';
import s from './Select.scss';

const COLORS = {
  main: '#004c7e',
  bgColor: 'rgba(115, 181, 251, 0.1)',
  color: '#57677f',
};

const DropdownIndicator = (props) => {
  return components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      <i className="material-icons" style={{ fontSize: 20 }}>
        arrow_drop_down
      </i>
    </components.DropdownIndicator>
  );
};

const customComponents = {
  DropdownIndicator,
};

class Select extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  renderSelect = () => {
    const {
      async, options, id, value, onChange, loadOptions, color,
      components: componentsProp, styles, touched, error, ...otherProps
    } = this.props;

    let ctrlColor = COLORS.main;

    if (color === 'white') {
      ctrlColor = '#fff';
    }

    const customStyles = {
      indicatorSeparator: () => null,
      option: (base, state) => {
        const bgColor = (state.isSelected || state.isFocused) && COLORS.bgColor;
        const optionStyles = {
          ':active': {
            backgroundColor: bgColor,
            color: COLORS.color,
          },
          padding: '10px 15px',
          color: COLORS.color,
          backgroundColor: bgColor,
        };
        return Object.assign({}, base, optionStyles);
      },
      menu: base => ({
        ...base,
        top: 46,
        borderRadius: 0,
        zIndex: 99999,
      }),
      placeholder: base => ({
        ...base,
        color: '#cacaca',
      }),
      singleValue: base => ({
        ...base,
        color: COLORS.color,
      }),
      dropdownIndicator: base => ({
        ...base,
        color: ctrlColor,
        ':hover': {
          color: ctrlColor,
        },
      }),
      control: (base, state) => {
        let border = '1px solid #cacaca';
        let backgroundColor = '#fff';
        let color = COLORS.color;
        if (state.isFocused) border = '1px solid #282c34';
        if (state.isDisabled) {
          color = '#cacaca';
          backgroundColor = 'rgba(111, 111, 111, 0.05)';
        }
        if (touched && error) {
          border = '1px solid #f05666';
          backgroundColor = 'rgba(240, 86, 102, 0.1)';
        }
        const controlStyles = {
          position: 'relative',
          border,
          borderRadius: 4,
          paddingLeft: 10,
          minHeight: 46,
          boxShadow: 'none',
          backgroundColor,
          color,
          ':hover': {
            border,
          },
        };
        return { ...base, ...controlStyles };
      },
      valueContainer: (base, state) => ({ ...base, padding: 0, color: state.isDisabled ? '#cacaca' : COLORS.color }),
    };

    if (async) {
      return (
        <Async
          instanceId={id}
          components={Object.assign({}, customComponents, componentsProp)}
          name={id}
          styles={Object.assign({}, customStyles, styles)}
          value={value}
          onChange={onChange}
          loadOptions={loadOptions}
          placeholder={{}}
          {...otherProps}
        />
      );
    }
    return (
      <ReactSelect
        instanceId={id}
        components={Object.assign({}, customComponents, componentsProp)}
        name={id}
        styles={Object.assign({}, customStyles, styles)}
        value={value}
        onChange={onChange}
        options={options}
        placeholder=""
        {...otherProps}
      />
    );
  }

  render() {
    const {
      className, label, id, required, helperText,
      touched, error,
    } = this.props;
    const classes = cn(
      s.root,
      className,
      (touched && error) && s.error,
    );

    return (
      <div className={`${classes}`}>
        {label && (
          <label htmlFor={id}>
            {label}
            {required && <sup>*</sup>}
          </label>
        )}
        { this.renderSelect() }
        {helperText && (
          <span className={s['helper-text']}>{helperText}</span>
        )}
      </div>
    );
  }
}

export default Select;
