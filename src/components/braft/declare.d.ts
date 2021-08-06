declare module 'braft-utils' {
    const BaseUtils: {
        UniqueIndex: () => number;
    };
    const ColorUtils: {
        namedColors: { [key in string]: string }
        getHexColors: (color: string) => string | null;
        detectColorsFromHTMLString: (html: any) => string[];
        detextColorsFromDraftState: (draftState: any) => string[];
    };
    
    const ContentUtils: {
        registerStrictBlockType: (blockType: any) => any;
        isEditorState: (editorState: any) => boolean;

        createEmptyEditorState: (decorators?: any) => any;
        createEditorState: (contentState: any, decorators?: any) => any;

        isSelectionCollapsed: (editorState: any) => boolean;
        selectionContainsBlockType: (editorState: any) => any;
        selectBlock: (editorState: any, block: any) => any;
        selectNextBlock: (editorState: any, block: any) => any;
        removeBlck: (editorState: any, block: any, lastSelection: any) => any;

        getSelectionBlock: (editorState: any) => any;
        getSelectedBlocks: (editorState: any) => any;
        updateEachCharacterOfSelection: (editorState: any, callback: any) => any;

        setSelectionBlockData: (editorState: any, blockData: any, override: boolean) => any;
        getSelectionBlockData: (editorState: any, name: string) => any;
        getSelectionBlockType: (editorState: any) => string;
        getSelectionText: (editorState: any) => string;
        getSelectionEntityType: (editorState: any) => string | null;
        getSelectionEntityData: (editorState: any, type: string) => any;

        toggleSelectionBlockType: (editorState: any, blockType: string) => any;
        toggleSelectionEntity: (editorState: any, entity: any) => any;
        toggleSelectionLink: (editorState: any, href: string, target?: string) => any;
        //...

        insertText: (editorState: any, text: string, inlineStyle: any, entity: any) => any;
        insertHTML: (editorState: any, htmlString: string, source?: string) => any;
        insertAtomicBlock: (editorState: any, type: any, immtable?: boolean, data?: {}) => any;
        //...
    };

    export { BaseUtils, ColorUtils, ContentUtils };
}

declare module 'braft-extensions/dist/emoticon' {
    export const emoticons: any;
    export default emoticons;
}



declare module 'draftjs-utils' {
    export const getSelectionEntity: (editorState: any) => any;
    export const getEntityRange: (editorState: any, entityKey: string) => any;
}