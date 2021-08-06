import React, { useState } from 'react';
import DraftEditor from './index';


interface Props {
    className?: string;
}
const Editor = (props:Props) => {
    const { className = '' } = props;
    const [data, setData] = useState();
    return (
        <div className={`${className} Editor`}>
            <DraftEditor
                value={data}
                onChange={setData}
                blockTypes={{}}
                cleanupTypes=""
                sidebar={0}
                handleDefaultData={type => ({})}
                handleUpload={() => { }}
                toolbar={undefined}
            />
        </div>
    );
}
export default Editor;
