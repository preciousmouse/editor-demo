import React from 'react';
import { Editor as WysiEditor } from 'react-draft-wysiwyg';
import './index.css';

interface Props {

}
export const Editor = (props: Props) => {
    
    return (
        <div>
            <WysiEditor

            />
        </div>
    )
}
export default Editor;