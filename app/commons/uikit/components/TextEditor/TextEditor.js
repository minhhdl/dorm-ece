/* eslint-disable */
import React from 'react';
import { EditorState, convertFromRaw, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import ToolbarPlugins from './components/Toolbar';
import { InlineToolbar, inlineToolbarPlugins } from './components/InlineToolbar';
import s from './scss/TextEditor.scss';

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [{
      key: '0',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
  }],
});

const { Toolbar } = ToolbarPlugins;
const plugins = [
  ToolbarPlugins,
  ...inlineToolbarPlugins,
];

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.editorState || EditorState.createWithContent(emptyContentState),
    };
    this.editor = React.createRef();
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handlePastedText = this.handlePastedText.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handlePastedFiles = this.handlePastedFiles.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ editorState: nextProps.editorState })
  }

  onEditorStateChange = (editorState) => {
    if (typeof this.props.onChange === 'function') this.props.onChange(editorState);
    this.setState(prevState => Object.assign(
      {},
      prevState,
      {
        editorState,
      }
    ));
  };

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onEditorStateChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  handlePastedText(text) {
    if(text.match(/.png|.jpg|.jpeg|.sgv|.gif/)) {
      setTimeout(() => this.onEditorStateChange(imagePlugin.addImage(this.state.editorState, text)), 1000)
    }
    if(text.match(/youtu.be|youtube.com/)) {
      setTimeout(() => this.onEditorStateChange(videoPlugin.addVideo(this.state.editorState, {
        srcID: text,
        srcType: 'youtube',
        url: text,
      })), 1000)
    }
  }

  handlePastedFiles(file) {
    mockUpload(file[0], (result) => {
      this.onEditorStateChange(imagePlugin.addImage(this.state.editorState, result.src))
    }, null, ()=>{});
  }

  render() {
    const { editorState } = this.state;
    const { label, readOnly } = this.props;

    return (
      <div className={s['text-editor']}>
        {label && (
          <label htmlFor="editor">
            {label}
          </label>
          )
        }
        <div className={s['editor-container']}>
          <Toolbar
            editorState={editorState}
            onChange={this.onEditorStateChange}
          />

          <div className={s.editor} onClick={() => this.editor.current.focus()}>
            <Editor
              className="editor-comspace"
              editorKey="editor"
              editorState={editorState}
              onFocus={() => this.isFocus = true}
              onChange={this.onEditorStateChange}
              handlePastedText={this.handlePastedText}
              handlePastedFiles={this.handlePastedFiles}
              handleKeyCommand={this.handleKeyCommand}
              plugins={plugins}
              readOnly={readOnly}
              ref={this.editor}
            />
            <InlineToolbar />
            <div className="clearfix" />
          </div>
        </div>
      </div>
    );
  }
}

export default TextEditor;
