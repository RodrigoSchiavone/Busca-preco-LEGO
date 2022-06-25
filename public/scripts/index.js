
const input = document.querySelector('#csv_file');
console.log(input);
let csvArray = [];

input.addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = function () {
        let commaSeparated = reader.result;
        commaSeparated = commaSeparated.replace(/;/g, ",");
        commaSeparated = commaSeparated.replace(/\r\n/g, ",");
        let csvDataArray = commaSeparated.split(",");
        csvArray = [...csvDataArray]
        console.log(csvArray);
    }
}, false)



