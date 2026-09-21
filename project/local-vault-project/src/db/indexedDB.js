/*

in here we create 

Database:
LocalVault

Object Store:
files

*/


//defining variables
const DATABASE_NAME = "LocalVault";

const DATABASE_VERSION = 1;

const FILE_STORE = 'files';

//this is how we open the database
export function openDatabase(){
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(
            DATABASE_NAME,
            DATABASE_VERSION
        );

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if(!db.objectStoreNames.contains(FILE_STORE)){
                db.createObjectStore(FILE_STORE, {
                    keyPath: "id"
                });
            }
        }

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error)
        }
    })
}

//in here why are we using a promise?

//The raw IndexedDB API is event-based.

//so

/*

18. Why are we using Promise?

The raw IndexedDB API is event-based.

For example:

request.onsuccess = ...
request.onerror = ...

But modern JavaScript code is much easier to work with if we can do:

const db = await openDatabase();

So we convert:

IndexedDB events
       ↓
Promise
       ↓
async/await

This is a very common wrapper pattern.

*/


//this is how we add metadata to the indexDB
export async function addFileMetaData(metadata){
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            FILE_STORE,
            'readwrite'
        );

        const store = transaction.objectStore(FILE_STORE);

        store.add(metadata);

        transaction.oncomplete = () => {
            resolve();
        }

        transaction.onerror = () => {
            reject(transaction.error);
        }
    })

}

//this is how we get meta data from the indexDB
export async function getAllFilesMetaData(){

    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            FILE_STORE,
            "readonly"
        );

        const store = transaction.objectStore(FILE_STORE);

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result)
        }

        request.onerror = () => {
            reject(request.error);
        }
    })
}

//to get a one specific file out of the index DB and to use to get the actual file from the opfs
export async function getFileMetadata(id){
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            FILE_STORE,
            "readonly"
        );

        const store = transaction.objectStore(FILE_STORE);

        const request = store.get(id);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}