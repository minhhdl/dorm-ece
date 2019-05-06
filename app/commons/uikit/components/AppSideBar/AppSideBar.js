import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import cn from 'classnames';
import { User as CurrentUser } from '../../../utils/user';
import s from './AppSideBar.scss';

const NAV_ITEMS = [
  {
    key: 'dashboard',
    label: 'Tổng quan',
    path: '/app',
    icon: 'dashboard',
    roles: ['admin', 'student'],
  },
  {
    key: 'register-dorm',
    label: 'Đăng ký phòng',
    path: '/app/register-dorm',
    icon: 'meeting_room',
    roles: ['student'],
  },
  {
    key: 'dorms',
    label: 'Quản lý phòng',
    path: '/app/dorms',
    icon: 'meeting_room',
    roles: ['admin'],
  },
  {
    key: 'dorms',
    label: 'Quản lý đăng ký phòng',
    path: '/app/dorm-registrations',
    icon: 'meeting_room',
    roles: ['admin'],
  },
  {
    key: 'users',
    label: 'Quản lý tài khoản',
    path: '/app/users',
    icon: 'people',
    roles: ['admin'],
    items: [
      {
        label: 'List users',
        path: '/app/users',
      },
      {
        label: 'Add a product',
        path: '/app/users/add',
      },
    ],
  },
];

const AppSideBar = ({ router, isCollapse }) => {
  const { pathname } = router;
  const user = CurrentUser.getCurrent() || {};
  const { role } = user;
  // const isAdmin = role === 'admin';
  return (
    <div className={cn(s.sidebar, isCollapse && s.collapsed)}>
      <ul>
        {
          NAV_ITEMS
          .filter(menu => menu.roles.indexOf(role) != -1)
          .map(menu => (
            <li key={menu.key}>
              {/* <Link href={menu.path} prefetch passHref> */}
                <a href={menu.path} className={cn(s['sidebar-link'], (pathname === menu.path) && s.active)}>
                  {
                    menu.icon && (
                    <i className="material-icons">
                      {menu.icon}
                    </i>
                  )}
                  {menu.label}
                  {/* {menu.items && <i className="material-icons">keyboard_arrow_down</i>} */}
                </a>
              {/* </Link> */}
              {/* {
                menu.items && (
                  <ul className={cn(s["sidebar-submenus"], s["active"])}>
                    {
                      menu.items.map((item, index) => (
                        <li key={index}>
                          <Link href={item.path}>
                            <a className={s["sidebar-link"]}>{item.label}</a>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                )
              } */}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default withRouter(AppSideBar);
