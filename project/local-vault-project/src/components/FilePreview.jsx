import { useEffect, useState } from "react";
import { retrieveFile } from "../services/fileService";

function FilePreview({ fileMetadata }) {
    const [fileUrl, setFileUrl] = useState("");
    const [error , setError] = useState("");

    useState(() => {
        async function loadFile(){
            try{
                setError("");

                const file = await retrieveFile(fileMetadata.id)

                const url = URL.createObjectURL(file)

                setFileUrl(url)
            }catch (error){
                console.error(error);
                setError("failed to load file");
            }
        }
        loadFile()
    }, [fileMetadata])

    useEffect(() => {
        return() => {
            if(fileUrl){
                URL.revokeObjectURL(fileUrl);
            }
        }
    }, [fileUrl])

    if(error){
        return <p>{error}</p>;
    }

    if(!fileUrl) {
        return <p>Loading preview...</p>;
    }

    if(fileMetadata.type.startsWith("image/")){
        return(
            <img src={fileUrl} alt={fileMetadata.name} width="400"/>
        )
    }
    
    if (fileMetadata.type.startsWith("video/")) {
        return (
            <video
                src={fileUrl}
                controls
                width="500"
            />
        );
    }

    if (fileMetadata.type.startsWith("audio/")) {
        return (
            <audio
                src={fileUrl}
                controls
            />
        );
    }

    return (
        <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
        >
            Open {fileMetadata.name}
        </a>
    );

}

export default FilePreview;