import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  theme: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange, theme }) => {
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
      theme: theme,
      automaticLayout: true,
      wordWrap: 'on',
      suggestOnTriggerCharacters: true,
    });

    // monaco.editor.setModelMarkers(editorRef.current.getModel()!, 'owner', [
    //   {
    //     severity: monaco.MarkerSeverity.Error,
    //     startLineNumber: 1,
    //     startColumn: 1,
    //     endLineNumber: 1,
    //     endColumn: 1,
    //     message: 'Error message',
    //   },
    // ]);

    editorRef.current.onDidChangeModelContent(() => {
      onChange(editorRef.current!.getValue());
    });

    return () => {
      editorRef.current?.dispose();
    };
  }, [theme]);

  return <div id="editor" style={{ height: '55vh', width: '55vh' }}></div>;
};

export default CodeEditor;