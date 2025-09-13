import { useEffect } from "react";

function DocumentTitle({ title }) {
    useEffect(() =>{
        document.title = title 
            ? `${title} - Topic Manager` 
            : 'Topic Manager';
    }, [title]);
}

export default DocumentTitle;