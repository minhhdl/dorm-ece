import React from 'react';
import cn from 'classnames';
import MUIMenuItem from '@material-ui/core/MenuItem';
import MUIMenuList from '@material-ui/core/MenuList';
import s from './styles.scss';

const MenuItem = ({ danger, ...other }) => (
  <MUIMenuItem classes={{ root: cn(s.menuItem, danger && s.danger) }} {...other} />
);

const MenuList = props => (
  <MUIMenuList classes={{ root: s.menuList }} {...props} />
);

export { MenuList, MenuItem };
