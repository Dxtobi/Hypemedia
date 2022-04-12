import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Preview from './preview';



const EditorMain = ({onContentStateChangePass, normalText, cleared, preview, display, setCleared, header, videoLink, tags, setPreview }) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  
  
  useEffect(() => {
    console.log(cleared)
    if(cleared){
      setEditorState(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML('<p>Enter a story</p>')
        )
      ))
      setCleared()
      console.log("don", cleared)
    }
  }, [cleared])

  const [convertedContent, setConvertedContent] = useState(null);


  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
    //console.log(state)
    }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
      setConvertedContent(currentContentAsHTML);
     onContentStateChangePass({
        __html: DOMPurify.sanitize(currentContentAsHTML)
        })
    }

  const contentChange = (e) => {
    //console.log(e.blocks[0].text);
   return normalText(e.blocks[0].text)
  }
   

  return (
    <div className="App">
      <Editor
        editorState={editorState}
        onContentStateChange={contentChange}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      {
        preview && <Preview display={display}
          convertedContent={convertedContent}
          header={header}
          videoLink={videoLink}
          tags={tags}
          setPreview={setPreview}
        />
      }
    </div>
  )
}
export default EditorMain;