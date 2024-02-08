import { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import { MDEditorProps } from '@uiw/react-md-editor';
import dynamic from "next/dynamic";

import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';

// 동적 컴포넌트 로딩 (클라이언트 측에서만 => 초기 페이지 로드 시간을 줄이는데 도움이됨)
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const MDViewer = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

export const MarkdownEditor = ({ ...rest }: MDEditorProps) => (
  <div data-color-mode="light">
    <MDEditor {...rest} />
  </div>
);

export const MarkdownViewer = ({ ...rest }: MarkdownPreviewProps) => (
    <div data-color-mode="light">
      <MDViewer {...rest} />
    </div>
);
  