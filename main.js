let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        sortBookObj.data = JSON.parse(this.responseText);
        sortBookObj.adDate();
        sortBookObj.sort();
    }
}
xmlhttp.open('GET', "boek.json", true);
xmlhttp.send();

const giveMonthNumber = (month) => {
    let number;
    switch(month){
        case "januari":     number = 0; break;
        case "februari":    number = 1; break;
        case "maart":       number = 2; break;
        case "april":       number = 3; break;
        case "mei":         number = 4; break;
        case "juni":        number = 5; break;
        case "juli":        number = 6; break;
        case "augustus":    number = 7; break;
        case "september":   number = 8; break;
        case "oktober":     number = 9; break;
        case "november":    number = 10; break;
        case "december":    number = 11; break;
        default: number = 0;
    }
    return number;
}

const ValidDate = (monthYear) => {
    let myArray = monthYear.split(" ");
    let date = new Date(myArray[1], giveMonthNumber(myArray[0]));
    return date;
}

const Summary = (array) => {
    let string = "";
    for(let i=0; i<array.length; i++){
        switch (i) {
            case array.length-1 : string += array[i]; break;
            case array.length-2 : string += array[i] + " en "; break;
            default: string += array[i] + ", ";
        }
    }
    return string;
}

let sortBookObj = {
    data: "",
    feature: "titel",
    opgaand: 1,
    adDate: function () {
        this.data.forEach((item) => {
            item.JSDate = makeValidDate(item.uitgave);
        });
    },

    sort: function(){
        this.data.sort( (a,b) => a[this.feature] > b[this.feature] ? 1*this.opgaand :  -1*this.opgaand);
        this.uitvoeren(this.data);
    },

    uitvoeren: function(data){
        let string = "";
        for(let i = 0; i < data.length; i++){
            string += `<div class="bookItem">
                <div class="bookItem__img">
                    <img src=` + data[i].cover + `>
                </div>
                <div class="bookItem__info">
                    <h3 class="bookItem__title">`+  data[i].titel + `</h3>
                    <p class="bookItem__p">` + "geschreven door: <span>" + data[i].auteur + "</span>" + `</p>
                    <p class="bookItem__p">` + "uitgegeven in: <span>" +data[i].uitgave + "</span>" + `</p>
                    <p class="bookItem__p">` + "het boek heeft <span>" + data[i].paginas + "</span> paginas" + `</p>
                    <p class="bookItem__p">` + "taal: <span>" + data[i].taal + "</span>" + `</p>
                    <p class="bookItem__p">` + "EAN: <span>" + data[i].ean + "</span>" + `</p>
                </div>
            </div>`;
        }
    document.getElementById('boeken').innerHTML = string;
    }
}

document.getElementById('feature').addEventListener('change', (e) => {
    sortBookObj.feature = e.target.value;
    sortBookObj.sort();
});

document.getElementsByName('opgaand').forEach((item) => {
    item.addEventListener('click', (e) => {
        sortBookObj.opgaand = parseInt(e.target.value);
        sortBookObj.sort();
    })
})