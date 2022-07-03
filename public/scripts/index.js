
const input = document.querySelector('#csv_file');
let csvArray
let test = false;

input.addEventListener('change', function (e) {
    const reader = new FileReader();


    reader.readAsText(input.files[0]);

    reader.onload = function () {
        let commaSeparated = reader.result;
        commaSeparated = commaSeparated.replace(/;/g, ",");
        commaSeparated = commaSeparated.replace(/\r\n/g, ",");
        let csvDataArray = commaSeparated.split(",");
        csvArray = csvDataArray;
        
        dataResponse(csvArray);
    }


}, false)

function dataResponse (data){
    console.log(JSON.stringify(data));
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/api', options);
}


