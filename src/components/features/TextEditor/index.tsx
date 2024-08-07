/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { lazy, useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useUploadImageRequest } from '../../../api-hooks/ImageUpload';
import toast from 'react-hot-toast';
import { EditorInstance } from '../../../@types/Editor';

const Editor = lazy(() => import('@toast-ui/react-editor').then((module) => ({ default: module.Editor })));

interface TextEditorProps {
  editorRef: React.MutableRefObject<EditorInstance | null>;
  content?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextEditor({ editorRef, content, onChange }: TextEditorProps) {
  const { uploadImageRequest } = useUploadImageRequest();

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.removeHook('addImageBlobHook');
      editorInstance.addHook('addImageBlobHook', (blob: Blob, callback: (url: string, altText: string) => void) => {
        void (async () => {
          try {
            await uploadImageRequest({ image: blob }).then((res) => {
              if (res) callback(res.data, '');
            });
          } catch (error) {
            toast.error('이미지 업로드에 실패했습니다');
          }
        })();

        return false;
      });
    }

    return () => {
      editorInstance?.removeHook('addImageBlobHook');
    };
  }, [editorRef]);

  return (
    <div>
      <Editor
        key={content}
        ref={editorRef}
        initialValue={content}
        previewStyle="vertical"
        hideModeSwitch="true"
        height="600px"
        initialEditType="wysiwyg"
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'image', 'link'],
          ['codeblock'],
        ]}
        plugins={[colorSyntax]}
        useCommandShortcut={true}
        onChange={onChange}
      />
    </div>
  );
}

export default TextEditor;
