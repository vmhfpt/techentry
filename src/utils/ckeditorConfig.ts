// ckeditor.ts

import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';


import {
    ImageInsert,
    ImageInline,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResizeEditing, 
    ImageResizeHandles,
    ImageResizeButtons,
    ImageBlock,
    AutoImage 
} from '@ckeditor/ckeditor5-image';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Alignment } from '@ckeditor/ckeditor5-alignment'; 
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
    Table, TableToolbar,
    ImageBlock,
    
    ImageInline,
    ImageResizeEditing, ImageResizeHandles,
    SimpleUploadAdapter,
    HorizontalLine,
    Alignment,

    Essentials,
    Autoformat,
    Bold,
    Italic,
    BlockQuote,
    Heading,
    Link,
    List,
    Paragraph,


    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    CodeBlock,
    ImageResizeButtons,
    ImageInsert,
    AutoImage
];

ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'insertTable',
            'horizontalLine',
            'alignment',
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'codeBlock',
            'undo',
            'redo',
            'imageUpload',
            'insertImage'
        ]
    },
    language: 'en',
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            'resizeImage:50',
            'resizeImage:75',
            'resizeImage:original',
        ],
        resizeOptions: [
            {
                name: 'resizeImage:original',
                value: null,
                icon: 'original'
            },
            {
                name: 'resizeImage:50',
                value: '50',
                icon: 'medium'
            },
            {
                name: 'resizeImage:75',
                value: '75',
                icon: 'large'
            }
        ],
        
    },
    simpleUpload: {
      
        uploadUrl: 'https://hungvu.site/upload',

      
    },
    codeBlock: {
        languages:  [
            { language: 'javascript', label: 'JavaScript' },
            { language: 'c', label: 'C' },
            { language: 'cs', label: 'C#' },
            { language: 'cpp', label: 'C++' },
            { language: 'css', label: 'CSS' },
            { language: 'diff', label: 'Diff' },
            { language: 'html', label: 'HTML' },
            { language: 'java', label: 'Java' },
            { language: 'plaintext', label: 'Plain text' }, // The default language.
            { language: 'php', label: 'PHP' },
            { language: 'python', label: 'Python' },
            { language: 'ruby', label: 'Ruby' },
            { language: 'typescript', label: 'TypeScript' },
            { language: 'xml', label: 'XML' }
        ],
       
    },
    table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
    }
};
