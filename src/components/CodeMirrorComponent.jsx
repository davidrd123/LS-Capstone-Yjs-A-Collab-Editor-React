// CodeMirrorComponent.js
import React, { useRef, useEffect } from 'react';
import * as Y from 'yjs';
import CodeMirror from 'codemirror';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';
import { CodemirrorBinding } from 'y-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';  // Import the CodeMirror CSS
// import './CodeMirrorComponent.css';  // Import the CodeMirror CSS
import 'codemirror/theme/monokai.css';  // Import the CodeMirror theme CSS

const CodeMirrorComponent = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Similar to your existing index.js code
    const ydoc = new Y.Doc();
    const indexeddbProvider = new IndexeddbPersistence('quill-demo-room', ydoc);
    const wsProvider = new WebsocketProvider('ws://localhost:1234', 'quill-demo-room', ydoc);
    const yText = ydoc.getText('codemirror');

    const editor = CodeMirror(editorRef.current, {
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
    });

    const binding = new CodemirrorBinding(yText, editor, wsProvider.awareness);
  }, []);

  return (
    <div ref={editorRef} />
  );
};



export default CodeMirrorComponent;
