const ROOT_DIRECTORY_NAME = "files"

//this retunrns OPFS root
export async function getRootDircetory(){
    return await navigator.storage.getDirectory();
}

//this is to get our application directory
export async function getFIlesDirectory(){
    const root = await getRootDircetory();

    return await root.getDirectoryHandle(
        ROOT_DIRECTORY_NAME,
        { create: true }
    )
}

//to avoid 2 files having same name issue we make folders inside the file directory and those folder will be named as the file ID, so this is how we do it
export async function saveFile(id, file){
    const filesDirectory = await getFIlesDirectory();

    const fileDirectory = await filesDirectory.getDirectoryHandle(
        id,
        { create: true } 
    )

    const fileHandle = await fileDirectory.getFileHandle(
        fileDirectory.name,
        { create: true }
    )

    const writable = await fileHandle.createWritable();

    await writable.write(file)

    await writable.close();
}

//now lets get the file we want by providing the id and the file Name 
export async function getStoredFile(id, fileName){
    const filesDirectory = await getFIlesDirectory();

    const fileDirectory = await filesDirectory.getDirectoryHandle(id);
    
    const fileHandle = await fileDirectory.getFileHandle(fileName);

    const file = await fileHandle.getFile();

    return file;
}