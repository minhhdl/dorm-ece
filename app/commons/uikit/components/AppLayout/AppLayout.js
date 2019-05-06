import React from 'react';
import cn from 'classnames';
import Measure from 'react-measure';
import AppBar from '../AppBar';
import AppSideBar from '../AppSideBar';

import s from './AppLayout.scss';

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuCollapse: false,
      dimensions: {},
    };
    this.triggerCollapse = this.triggerCollapse.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  onResize(contentRect) {
    const { width } = contentRect.bounds;
    const { isMenuCollapse, dimensions } = this.state;
    if (width < 768 && width !== dimensions.width && !isMenuCollapse) {
      this.setState({ isMenuCollapse: true, dimensions: contentRect.bounds });
    }
  }

  triggerCollapse() {
    this.setState(prevState => ({ isMenuCollapse: !prevState.isMenuCollapse }));
  }

  render() {
    const { title, topRightButton, children } = this.props;
    const { isMenuCollapse } = this.state;
    const classes = cn(
      s['app-layout'],
    );
    return (
      <Measure
        bounds
        onResize={this.onResize}
      >
        {({ measureRef }) => (
          <div ref={measureRef} id="app" className={s.app}>
            <AppBar triggerCollapse={this.triggerCollapse} />
            <div className={classes}>
              <AppSideBar isCollapse={isMenuCollapse} />
              <div className={cn(s['app-content'], isMenuCollapse && s.menuCollapsed)}>
                <div className={s['page-title']}>
                  <h1>
                    {title}
                  </h1>
                </div>
                <div className="flex-justify-content-right m-b-20">
                  {
                    topRightButton && (
                      React.cloneElement(topRightButton)
                    )
                  }
                </div>
                {children}
              </div>
            </div>
          </div>
        )}
      </Measure>
    );
  }
}

export default AppLayout;
