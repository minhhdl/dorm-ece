import React from 'react';
import Collapse from '@material-ui/core/Collapse';

const Expandable = ({ in: isExpanded, children }) => {
  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      {children}
    </Collapse>
  )
}
export default Expandable;