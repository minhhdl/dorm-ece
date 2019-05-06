import React from 'react';
import PropTypes from 'prop-types';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cn from 'classnames';
import s from './TextField.scss';

class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderInputElement = this.renderInputElement.bind(this);
    this.renderInputAdornment = this.renderInputAdornment.bind(this);
    
    this.textareaRef = React.createRef();
  }

  onFocus = (event) => {
    this.setState({ focused: true });
    if (this.props.onFocus) this.props.onFocus(event);
  }

  onBlur = (event) => {
    this.setState({ focused: false });
    if (this.props.onBlur) this.props.onBlur(event);
  }

  onChange = (event) => {
    const { multiline, autoHeight, onChange } = this.props;
    if (multiline && autoHeight) {
      const { current } = this.textareaRef;
      
      const { style } = current;
      style.height = 'auto';
      
      const { clientHeight, scrollHeight } = current;

      if (clientHeight < scrollHeight) style.height = `${scrollHeight}px`;
    }
    if (onChange) onChange(event);
  }

  renderInputElement() {
    const { multiline, id, value, inputProps, type = 'text', accept } = this.props;
    return multiline ? (
      <textarea
        id={id}
        name={id}
        rows={1}
        type="text"
        ref={this.textareaRef}
        value={value}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
        {...inputProps}
      />
    ) : (
      <input
        id={id}
        name={id}
        type={type}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onChange={this.onChange}
        value={value}
        accept={accept}
        {...inputProps}
      />
    )
  }

  renderInputAdornment(adornment){
    return adornment && (
      <div className={s['input-adornment']}>
        {adornment}
      </div>
    )
  }

  render() {
    const {
      id,
      label,
      multiline,
      autoHeight,
      value,
      startAdornment,
      endAdornment,
      helperText,
      error,
      touched,
      className,
      inputProps,
      labelProps,
      onChange,
      underlineColor,
      ...otherProps
    } = this.props;

    const {
      focused,
    } = this.state;

    const classes = cn(
      s.root,
      className,
      touched && error && s.error,
    );
    const inputWrapperClasses = cn(
      s['input-element'],
      underlineColor == "main" && s['underline-color-main'],
      focused && s.focused,
    );
  
    return (
      <div className={`${classes}`} {...otherProps}>
        {label && <label htmlFor={id} {...labelProps}>{label}</label>}

        <div className={s['input-group']}>
          
          {this.renderInputAdornment(startAdornment)}

          <div className={inputWrapperClasses}>
            { this.renderInputElement() }
          </div>

          {this.renderInputAdornment(endAdornment)}

        </div>

        {helperText && (
          <span className={s['helper-text']}>{helperText}</span>
        )}
      </div>
    );
  }
}

TextField.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  underlineColor: PropTypes.string
};

TextField.defaultProps = {

};


export default TextField;
