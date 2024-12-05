import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css'; // Ensure you're importing styles for react-quill-new

interface RichEditorProps {
    placeholder: string;
    onChange: (value: string) => void;
    value?: string;
}

const RichEditor = ({ placeholder, onChange, value }: RichEditorProps) => {
    // Dynamically import ReactQuill to avoid SSR issues
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), { ssr: false }), []);

    return (
        <ReactQuill 
            theme="snow" 
            placeholder={placeholder} 
            onChange={onChange} 
            value={value} 
        />
    );
}

export default RichEditor;