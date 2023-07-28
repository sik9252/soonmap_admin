import { useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

interface TextEditorProps {
  editorRef: React.MutableRefObject<null>;
  content?: string;
}

function TextEditor({ editorRef, content }: TextEditorProps) {
  // useEffect(() => {
  //   if (editorRef.current) {
  //     editorRef.current.getInstance().removeHook('addImageBlobHook');
  //     editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
  //       (async () => {
  //         let formData = new FormData();
  //         formData.append('file', blob);

  //         imageUpload(formData)
  //           .then((res) => {
  //             callback(res.data.url, 'image');
  //           })
  //           .catch((error) => {
  //             alert(error.response.data.message);
  //           });
  //       })();

  //       return false;
  //     });
  //   }
  //   return () => {};
  // }, [editorRef]);

  return (
    <div>
      <Editor
        ref={editorRef}
        initialValue={content}
        previewStyle="vertical"
        hideModeSwitch="true"
        height="600px"
        initialEditType="markdown"
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
        plugins={[colorSyntax]}
        useCommandShortcut={true}
      />
    </div>
  );
}

export default TextEditor;
