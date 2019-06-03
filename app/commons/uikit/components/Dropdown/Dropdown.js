import React, { createRef } from 'react';
import cn from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '../Button';
import s from './Dropdown.scss';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      right: props.placement === 'right',
    };
    this.openDropdown = this.openDropdown.bind(this);
    this.checkOffset = this.checkOffset.bind(this);
    this.dropdown = React.createRef();
    this.dropdownMenu = React.createRef();
  }

  // componentDidMount() {
  //   document.addEventListener('click', this.closeDropdown);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('click', this.closeDropdown);
  // }

  onDropdownClick = () => {
    this.preventNextClose = true;
  }

  closeDropdown = (callback) => {
    const { onHidden } = this.props;
    // if (!this.preventNextClose && this.state.active) {
    //   this.setState({
    //     active: false,
    //   }, () => {
    //     if (typeof onHidden === 'function') onHidden();
    //   });
    // }

    // this.preventNextClose = false;
    this.setState({
      active: false,
    }, () => {
      if (typeof onHidden === 'function') onHidden();
      if (typeof callback === 'function') callback();
    });
  }

  checkOffset() {
    const { current } = this.dropdownMenu;
    const { clientWidth } = current;
    const { left } = this.dropdown.current.getBoundingClientRect();
    const { innerWidth } = window;
    const sum = clientWidth + left;
    let outOfView = false;
    if (sum > innerWidth) {
      outOfView = true;
    }
    return outOfView;
  }

  openDropdown() {
    const { onShown, placement } = this.props;
    // this.preventNextClose = true;
    this.setState(prevState => ({ active: !prevState.active }), () => {
      if (this.state.active) {
        this.setState({ right: placement === 'right' || this.checkOffset() });
        if (typeof onShown === 'function') onShown();
      }
    });
  }

  renderButton = () => {
    const { renderButton, buttonProps, label } = this.props;
    if (renderButton) {
      return renderButton({ onClick: this.openDropdown, ...buttonProps });
    }
    return (
      <Button type="button" onClick={this.openDropdown.bind(this)} {...buttonProps}>
        {label}
      </Button>
    );
  };

  render() {
    const { label, buttonProps, children, className } = this.props;
    const { active, right } = this.state;

    return (
      <div ref={this.dropdown} className={cn(s.dropdown, right && s.right, active && s.active, className)}>
        {this.renderButton()}
        <ClickAwayListener onClickAway={this.closeDropdown}>
          <div
            ref={this.dropdownMenu}
            className={cn(s['dropdown-wrapper'], active && s.active)}
          >
            <div className={s['dropdown-menu']}>
              {(typeof children === 'function') ? children({ closeDropdown: this.closeDropdown }) : (
                React.Children.map(children, (child, index) => {
                  if (!React.isValidElement(child)) {
                    return null;
                  }

                  return React.cloneElement(child, {
                    key: index,
                    // onClick: this.closeDropdown,
                  });
                })
              )}
            </div>
          </div>
        </ClickAwayListener>
      </div>
    );
  }
}

export default Dropdown;
