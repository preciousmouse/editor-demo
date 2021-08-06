import React, { useCallback, useState } from 'react';
import CustomEditor, { EditorState as BraftEditorState } from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { getSelectionEntity, getEntityRange } from 'draftjs-utils';
import { Form, Input, Modal, Popconfirm } from 'antd';
import { throttle } from 'lodash';
import { EditorState, Modifier, SelectionState } from 'draft-js';
require('braft-editor/dist/index.css');
require('./index.css');


const CustomLink = (props: { title: string, url: string, children?: JSX.Element, onDataChange?: (val: { title: string, url: string }) => void }) => {
    console.log('Cusomterlink render', props);
    const { title, url, children, onDataChange } = props;
    // const [id] = useState((+new Date).toString());
    // const [form] = Form.useForm();

    // const onConfirm = () => {
    //     const values = form.getFieldsValue(true);
    //     onDataChange && onDataChange(values);
    // }
    // const showModal = () => {
        // Modal.confirm({
        //     icon: null,
        //     content: (<div>
        //         <Form name={id} form={form} initialValues={{ title, url }}>
        //             <Form.Item name="title"><Input /></Form.Item>
        //             <Form.Item name="url"><Input /></Form.Item>
        //         </Form>
        //     </div>),
        //     onOk: onConfirm,
        // });
    // }
    return (
        <span data-title={title} data-url={url} className='custom-link-item'>
            {/* <a href={url} onClick={showModal}>{children}</a> */}
            {/* <a href={url}>{children}</a> */}
            <a href={url}>{title}</a>
        </span>
    );
}
const CustomLinkTool = (props: { onSubmit: (data: any) => void }) => {
    const data = { title: 'asdgsadagagdsg', url: 'http://www.baidu.com/asdgsadagagdsg' }; //test
    return (
        <button onClick={() => props.onSubmit(data)}>add link</button>
    )
}
const addLink = (editorState: BraftEditorState, data: any = {}) => {
    console.log('addLink', editorState, data);
    // const nextState = ContentUtils.insertAtomicBlock(editorState, 'custom-link', true, {...data});
    // const nextState = ContentUtils.insertText(editorState, data.title, null, {
    //     type: 'custom-link',
    //     mutability: 'IMMUTABLE',
    //     data,
    // });
    const nextState = ContentUtils.insertHTML(editorState, `<a href="${data.url}">${data.title}</a>`, 'add-link');
    console.log('nextState', nextState);
    // setEditorState(nextState);
    return nextState;
}

const CustomLinkExtension = {
    type: 'entity',
    name: 'custom-link',
    mutability: 'IMMUTABLE',
    data: {},
    control: (props:any) => {
        console.log('control', props);
        const { editorState } = props;
        const contentState = editorState.getCurrentContent();
        const entityKey = getSelectionEntity(editorState);
        const entity = entityKey && contentState.getEntity(entityKey);
        const entityType = entity?.get('type');
        const isSelectLink = entityType?.toLocaleLowerCase() === 'custom-link';
        
        // const selectEntityType = ContentUtils.getSelectionEntityType(props.editorState);
        // const isSelectLink = selectEntityType?.toLocaleLowerCase() === 'custom-link';
        // if (isSelectLink) {
            
        // } else {
            
        // }
        // const component = isSelectLink
        //     ? <button onClick={() => {
                
        //     }}>change</button>
        //     : <button onClick={() => {
        //         props.editor.push(addLink(props.editorState, { title: 'new', url: 'https://www.baidu.com?new' }), '');
        //     }}>new</button>;
        //     // : <CustomLinkTool onSubmit={(data) => props.editor.push(addLink(props.editorState, data), '')} />;
        let component;
        if (isSelectLink) {
            const { title, url } = entity.getData();
            const entityRange = getEntityRange(editorState, entityKey);
            component = (
                <button onClick={() => {
                    const entitySelection = new SelectionState({
                        anchorKey: entityKey, anchorOffset: entityRange.start,
                        focusKey: entityKey, focusOffset: entityRange.end,
                    });
                    let nextContentState;
                    nextContentState = Modifier.replaceText(contentState, entitySelection, 'change', undefined, entityKey);
                    nextContentState = nextContentState.replaceEntityData(entityKey, { title: 'change', url: 'https://www.baidu.com?change' });
                    props.editor.setValue(EditorState.push(editorState, nextContentState,
                        // 'adjust-depth'
                        'apply-entity'
                        // 'backspace-character'
                        // 'change-block-data'
                        // 'change-block-type'
                        // 'change-inline-style'
                        // 'move-block'
                        // 'delete-character'
                        // 'insert-characters'
                        // 'insert-fragment'
                        // 'redo'
                        // 'remove-range'
                        // 'spellcheck-change'
                        // 'split-block'
                        // 'undo'
                    ));
                }}>change with origin {`{ title: ${title}, url: ${url} }`}</button>
            );
        } else {
            component = (
                <button onClick={() => {
                    props.editor.setValue(addLink(props.editorState, { title: 'new', url: 'https://www.baidu.com?new' }), '');
                }}>new</button>
            );
        }
        return {
            key: 'custom-link',
            replace: 'custom-link-placeholder',
            type: 'dropdown',
            text: '链接',
            showArrow: false,
            autoHide: true,
            component,
        };
    },
    component: (props: any) => {
        console.log('custom-link component', props);
        const entity = props.contentState.getEntity(props.entityKey);
        const { title, url } = entity.getData();
        // return (<CustomLink title={title} url={url} onDataChange={newVal => {
        //     const next = props.contentState.replaceEntityData(props.entityKey, newVal);
        //     console.log('ondatachange', newVal,next);
        // }}>{props.children}</CustomLink>);
        console.log('custom-link component CustomLink render', title, url, props.children);
        return (<CustomLink title={title} url={url}>{props.children}</CustomLink>);
    },
    importer: (nodeName: string, node: HTMLElement, source?: string) => { //HTML转换entity函数
        if (nodeName.toLowerCase() === 'a') {
            const url = (node as HTMLLinkElement).href, title = node.innerText;
            return {
                mutability: 'IMMUTABLE',
                data: { title, url }
            };
        }
    },
    exporter: (entityObj: { type: string, mutability: string, data: any }, originText: string) => { //entity转换HTML函数
        const { title, url } = entityObj.data;
        // return (<CustomLink title={title} url={url}>{originText}</CustomLink>);
        return (<a href={url}>{originText}</a>)
    },
};
CustomEditor.use([CustomLinkExtension]);


const testOnChange = (nextState: BraftEditorState) => {
    console.log('testOnChange', nextState);
}

interface Props {
    onChange?: any;
}
const Editor = (props:Props) => {
    const [editorState, setEditorState] = useState<BraftEditorState>(
        // ContentUtils.createEmptyEditorState()
        CustomEditor.createEditorState(`<p>123<a target="_blank" href="https://c.123">hhhhhhhsdfds鼎折覆餗dhhhhhh</a></p>`)
    );

    const { onChange = testOnChange } = props;
    const propOnChange = useCallback(throttle(onChange, 1000), []);
    const handleChange = (nextState: BraftEditorState) => {
        // console.log('handleChange', nextState);
        setEditorState(nextState);
        propOnChange(nextState);
    }

    

    const insertImage = () => {
        
    }
    return (
        <div className='Editor'>
            <CustomEditor
                value={editorState}
                onChange={handleChange}
                placeholder="请输入..."
                readOnly={false}
                language="zh"
                controls={[
                    'undo', 'redo', 'separator',// 'EMOTICON',
                    // 'link',
                    // { key: 'link', text: '链接' },
                    // {
                    //     key: 'custom-link', title: '链接', text: '链接', type: 'dropdown', showArrow: false, autoHide: true,
                    //     component: <CustomLinkTool onSubmit={(data) => addLink(editorState, data)} />,
                    //     // component: (props:any) => CustomLinkTool({ ...props, onSubmit: (data) => addLink(props.editor, props.editorState, data) }),
                    // },
                    { key: 'custom-link-placeholder', title: '链接', text: '链接', type: 'button' },
                    { key: 'custom-image', title: '图片', text: '图片', type: 'button', onClick: insertImage },
                    'separator', { key: 'hr', title: '分隔符', text: '分隔符' }, 'clear'
                ]}
                
                defaultLinkTarget='_blank'
            />
        </div>
    );
}
export default Editor;
