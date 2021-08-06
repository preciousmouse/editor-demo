import React from 'react';
import DraftEditor from 'draft-wysiwyg';
import { RawDraftContentState } from 'draft-js';

interface Props {
    plugins: any;
//dnd-plugin
    handleUpload: (
        data: { files: File[], formData: FormData },
        success: (files: File[]) => void,
        failed: (...params: any[]) => void,
        progress: (percent: number) => void,
    ) => void;
    handleDefaultData: (type: string) => any;
//toolbar-plugin
    toolbar: { disableItems: any[], textActions: any[] };
//private props
    value: RawDraftContentState;
    onChange: any;
    readOnly: any;
    blockTypes: any;
//only for shouldComponentUpdate
    fileDrag: any;
    uploading: any;
    precent: any;
//unused
    isDragging: any;
    progress: any;
    cleanupTypes: any;
    sidebar: any;
}
export const Editor = (props: Partial<Props>) => (
    <DraftEditor {...props} />
)
export default Editor;