import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class ControlledEditor extends Component {
  
    state = {
        editorState: EditorState.createEmpty(),
        content:{}
    }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  
  };

  onContentStateChange = (content) => {
    this.setState({
        content:content,
    });
    this.props.onContentStateChange(content)
  };
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
       // wrapperClassName="demo-wrapper"
       // editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onContentStateChange}
            toolbarClassName="rdw-storybook-toolbar"
            wrapperClassName="rdw-storybook-wrapper"
            editorClassName="editor"
            toolbar={{ options: [
                         'inline',
                         'blockType',
                         'fontSize',
                         'fontFamily',
                         'list',
                         'textAlign',
                         'colorPicker',
                         'link',
                         'embedded',
                         'emoji',
                         'remove',
                         'history'], 
                        }}
      />
    )
  }
}
export default ControlledEditor;