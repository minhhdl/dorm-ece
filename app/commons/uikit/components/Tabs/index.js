import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import s from './Tabs.scss';

const CTabs = ({
  tabLabels, value, handleChange, tabContainerClasses = {}, tabClasses = {}, ...other
}) => (
  <Tabs
    value={value}
    onChange={handleChange}
    classes={Object.assign(
      {},
      {
        root: s.root,
        indicator: s.indicator,
      },
      tabContainerClasses,
    )}
    {...other}
  >
    {
      tabLabels.map(item => (
        <Tab
          key={`tab-${item.id}`}
          label={item.label}
          disableRipple
          value={item.value}
          classes={Object.assign(
            {},
            {
              root: s.tabRoot,
              selected: s.tabSelected,
              label: s.label,
            },
            tabClasses,
          )}
        />
      ))
    }
  </Tabs>
);

export default CTabs;
