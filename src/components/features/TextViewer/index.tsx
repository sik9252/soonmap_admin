import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

interface TextViewerProps {
  content: string;
}

export default function ToastViewer({ content }: TextViewerProps) {
  if (content) {
    return <Viewer initialValue={content} />;
  }
}
