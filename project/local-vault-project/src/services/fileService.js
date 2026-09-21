import { getStoredFile, saveFile } from "../storage/opfs";
import { addFileMetaData, getAllFilesMetaData, getFileMetadata } from "../db/indexedDB";

export async function storeFile(file){
    const id = crypto.randomUUID()

    await saveFile(id, file);

    await addFileMetaData({
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        createdAt: Date.now()
    });

    return id;
}

//to retrieve file:
export async function retrieveFile(id){
    const metadata = await getFileMetadata(id);

    if (!metadata){
        throw new Error("Files metadata not found");
    }

    const file = await getStoredFile(
        metadata.id,
        metadata.name
    );

    return file;
}