//create var to hold db connection
let db; 
const request = indexDB.open('budget', 1);

//handles event of a change that needs to be made to db structure 
request.onupgradeneeded = function(event) {
    //save ref to db
    const db = event.target.result;
    db.createObjectStore('newTransaction', { autoIncrement: true });
};

//upon success
request.onsucess = function(event) {
    //when db is created with object sore, save ref to db in global var
    db = event.target.result;

    //check if app online
    if(navigator.onLine) {
        //uploadTransaction();
    }
};

request.onerror = function(event) {
    //log error
    console.log(event.target.errorCode);
};

//function executed after submitting transaction
function saveRecord(record) {
    const transaction = db.transaction(['newTransaction'], 'readwrite');

    const transactionObjectStore = transaction.objectStore('newTransaction');
    transactionObjectStore.add(record);
}