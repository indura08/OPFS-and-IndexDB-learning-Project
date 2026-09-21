import { useEffect, useState } from "react";
import { getAllFilesMetaData } from "../db/indexedDB";
import FilePreview from "./FilePreview";

function FileList(){
    const [files, setFiles] = useState([]);
    const [selectedfile, setSelectedFile] = useState(null);

    async function loadFile(){
        const storedFiles = await getAllFilesMetaData();

        setFiles(storedFiles);
    }

    useEffect(() => {
        loadFile();
    }, []);

    return(
        <div>

            <h2>Stored Files</h2>

            {files.map((file) => (
                <div key={file.id}>

                    <strong>
                        {file.name}
                    </strong>

                    <p>
                        {file.type}
                    </p>

                    <button onClick={() => setSelectedFile(file)}>Preview</button>

                    {selectedfile.id === file.id && (
                        <FilePreview fileMetadata={file}/>
                    )}

                </div>
            ))}

        </div>
    );
}

export default FileList;