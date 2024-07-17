import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { lazy } from 'react';

const Viewer = lazy(() => import('@toast-ui/react-editor').then((module) => ({ default: module.Viewer })));

interface TextViewerProps {
  content: string | undefined;
}

export default function ToastViewer({ content }: TextViewerProps) {
  if (content) {
    return <Viewer key={content} initialValue={content} />;
  }
}
