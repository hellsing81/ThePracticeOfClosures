import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        const value = editorRef.current.getValue();
        if (value !== code) {
          model.setValue(code);
        }
      }
    }
  }, [code]);

  useEffect(() => {
    editorRef.current = monaco.editor.create(document.getElementById('editor')!, {
      value: code,
      language: 'javascript',
      theme: 'vs-dark',
    });

    editorRef.current.onDidChangeModelContent(() => {
      onChange(editorRef.current!.getValue());
    });

    return () => {
      editorRef.current?.dispose();
    };
  }, []);

  return <div id="editor" style={{ height: '400px', width: '100%' }}></div>;
};

export default CodeEditor;