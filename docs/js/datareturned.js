
function sendData(){
    const datacontainer =document.getElementById("insertedData");
    while(datacontainer.firstChild){
        datacontainer.removeChild(datacontainer.firstChild);
    }

fetch("/opinions").then(
    function(res){
        return res.json();
    }
).then(function (dataInserted){
    dataInserted.forEach(element => {
        let elementItem = document.createElement("p");
        elementItem.textContent = element.firstName + " "+ element.lastName + "-" + element.email +'-'+ element.phoneNumber ;
        //document.querySelector(".insertedData").appendChild(elementItem);
    datacontainer.appendChild(elementItem);
    });
}).catch((err) =>{
    console.error("!" + err);
    alert("error");
});
}
sendData();