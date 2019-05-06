/* eslint-disable css-modules/no-undef-class */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from '../sass/Grid.scss';

class Col extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    col: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    col: false,
  };

  render() {
    const {
      className, children, xs, sm, md, lg, xl, col, ...other
    } = this.props;

    const classname = cn(
      xs && s[`col-xs-${xs}`],
      sm && s[`col-sm-${sm}`],
      md && s[`col-md-${md}`],
      lg && s[`col-lg-${lg}`],
      xl && s[`col-xl-${xl}`],
      col && s.col,
      className,
    );

    return (
      <div className={classname} {...other}>
        {children}
      </div>
    );
  }
}

export default Col;
