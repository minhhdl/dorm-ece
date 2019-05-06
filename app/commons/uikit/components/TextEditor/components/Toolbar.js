import React from 'react';

import createToolbarPlugin from 'draft-js-static-toolbar-plugin';

import toolbarStyles from '../scss/Toolbar.scss';
import buttonStyles from '../scss/ToolbarButton.scss';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  SupButton,
  SubButton,
  BlockquoteButton
} from 'draft-js-buttons';

import Dropdown from '../../Dropdown';

class HeadlinesButton extends React.PureComponent {
  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div className={buttonStyles.buttonWrapper}>
        <Dropdown
          label="H"
          buttonProps={{
            className: buttonStyles.button,
            clear: true
          }}
        >
          {buttons.map((Button, i) => // eslint-disable-next-line
            <Button key={i} {...this.props} />
          )}
        </Dropdown>
      </div>
    );
  }
}

const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    BlockquoteButton,
    HeadlinesButton,
    UnorderedListButton,
    OrderedListButton,
    SupButton,
    SubButton,
  ],
  theme: { buttonStyles, toolbarStyles }
});

export default toolbarPlugin;