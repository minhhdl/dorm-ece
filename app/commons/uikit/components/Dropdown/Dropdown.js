import React from 'react';
import cn from "classnames";
import Button from '../Button';
import s from './Dropdown.scss';

class Dropdown extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.closeDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }

  closeDropdown = () => {
    if (!this.preventNextClose && this.state.active) {
      this.setState({
        active: false,
      });
    }

    this.preventNextClose = false;
  };

  onDropdownClick = () => {
    this.preventNextClose = true;
  }

  openDropdown() {
    this.preventNextClose = true;
    this.setState({active: !this.state.active});
  }

  render() {
    const { label, buttonProps, children } = this.props;
    const { active } = this.state;
    return (
      <div className={cn(s["dropdown"], active && s["active"])}>
        <Button type="button" onClick={this.openDropdown.bind(this)} {...buttonProps}>
          {label}
        </Button>
        <div className={cn(s["dropdown-wrapper"], active && s["active"])} onClick={this.onDropdownClick}>
          <div className={s["dropdown-menu"]}>
            {React.Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) {
                return null;
              }

              return React.cloneElement(child, {
                key: index,
              });
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Dropdown;