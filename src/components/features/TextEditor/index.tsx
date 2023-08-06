/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useUploadImageRequest } from '../../../api/TextEditor';
import toast from 'react-hot-toast';

interface TextEditorProps {
  editorRef: React.MutableRefObject<Editor | null>;
  content?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextEditor({ editorRef, content, onChange }: TextEditorProps) {
  const {
    mutateAsync: uploadImageRequest,
    data: uploadImageData,
    error: uploadImageError,
    isLoading: uploadImageLoading,
  } = useUploadImageRequest();

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.removeHook('addImageBlobHook');
      editorInstance.addHook('addImageBlobHook', (blob: Blob, callback: (url: string, altText: string) => void) => {
        void (async () => {
          try {
            await uploadImageRequest({ image: blob });
            if (uploadImageData) {
              console.log(typeof uploadImageData.data);
              callback(uploadImageData.data, 'alt text');
            }
          } catch (error) {
            toast.error((uploadImageError as Error).message);
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
        onChange={onChange}
      />
    </div>
  );
}

export default TextEditor;
