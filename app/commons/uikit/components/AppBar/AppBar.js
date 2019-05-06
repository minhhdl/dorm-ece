import React from 'react';
import cn from 'classnames';
import { User } from '../../../utils/user';
import Button from '../Button';
import s from './AppBar.scss';

const NAV_ITEMS = [];

class AppBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    User.removeSession();
    window.location.href = '/app/login';
  }

  render() {
    const { className, triggerCollapse } = this.props;
    const classes = cn(
      s.root,
      className,
    );

    const user = User.getCurrent();
    const { fullname } = user || {};

    return (
      <header className={s.header}>
        <div className={classes}>
          <div className={s['logo-section']}>
            {/* PUT LOGO IMAGE HERE */}
            KTX
          </div>
          <Button
            autoWidth
            clear
            color="light-grey"
            className={s.collapseButton}
            onClick={triggerCollapse}
          >
            <i className="material-icons">
              menu
            </i>
          </Button>
          <div className={s['nav-section']}>
            {/* <ul className={s['nav-list']}>
              {
                NAV_ITEMS.map(item => (
                  <li className={s['nav-item']} key={item.id}>
                    <Link href={item.path}>
                      <a className={`${s["nav-link"]} ${item.active && s["active"]}`}>
                        <img src={item.icon} alt={`Comspaces-${item.label}`} />
                      </a>
                    </Link>
                  </li>
                ))
              }
            </ul> */}
            <div className={s.logout}>
              <span>{fullname}</span>
              <Button
                clear
                autoWidth
                className={s.logoutButton}
                onClick={this.logout}
              >
                Log out <i className="material-icons">exit_to_app</i>
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

AppBar.propTypes = {

};

AppBar.defaultProps = {

};

export default AppBar;
