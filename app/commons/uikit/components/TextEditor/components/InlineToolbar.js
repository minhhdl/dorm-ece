import createLinkPlugin from 'draft-js-anchor-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import { ItalicButton, BoldButton, UnderlineButton } from 'draft-js-buttons';

import 'draft-js-anchor-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';

const linkPlugin = createLinkPlugin();

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    linkPlugin.LinkButton
  ]
});

const { InlineToolbar } = inlineToolbarPlugin;
const inlineToolbarPlugins = [inlineToolbarPlugin, linkPlugin];

export { InlineToolbar, inlineToolbarPlugins }