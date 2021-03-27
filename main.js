let productInfo = [];
let currentCard = 0;
let containerDiv = document.querySelector(".container-card");
imgPathArray = ['mustache.jpg', 'refrige.jpg', 'suture.jpg', 'baby-mop.jpg', 'realistic-dog-pillow.jpg'];

fetch("product.json")
.then(resp => resp.json())
.then(data => data.forEach(element => productInfo.push(element)))
.then(() => {
    createCards();
    envInitialize();
});

function envInitialize(){
    //show the first card
    document.querySelectorAll('.container-structure-item2 div').forEach(element=>{
        element.style.display = "none";
        if(element === document.querySelector(".card" + currentCard)){
            element.style.display = "";
        }
    });

    //hide the left button
    document.querySelector('#button-left').style.display = 'none';
}

function createCards(){
    for(let i = 0; i < imgPathArray.length; i++){
        let cardDiv = document.createElement('div');
        let cardClassDiv = document.createAttribute('class');
        cardClassDiv.value = 'card' + i;
        cardDiv.setAttributeNode(cardClassDiv);
    
        let h2 = document.createElement('h2');
        h2.innerHTML = productInfo[i]["productName"];
    
        let img = document.createElement('img');
        let imgSrc = document.createAttribute('src');
        let imgWidth = document.createAttribute('width');
        let imgHeight = document.createAttribute('height');
        imgSrc.value = 'img/' + imgPathArray[i];
        imgWidth.value = '450';
        imgHeight.value = '450';
        img.setAttributeNode(imgSrc);
        img.setAttributeNode(imgWidth);
        img.setAttributeNode(imgHeight);

    
        let paraDescription = document.createElement('p');
        let paraDescriptionId = document.createAttribute('id');
        paraDescriptionId.value = 'card-description';
        paraDescription.setAttributeNode(paraDescriptionId);
        paraDescription.innerHTML = "<h3>Description</h3>" + productInfo[i]["description"];
    
    
        let paraFeatures = document.createElement('p');
        let paraFeaturesId = document.createAttribute('id');
        paraFeaturesId.value = 'card-feature';
        paraFeatures.setAttributeNode(paraFeaturesId);
        let featureList = "";
        productInfo[i]["features"].forEach(element=>featureList += ("<li>" + element + "</li>"));
        paraFeatures.innerHTML = "<h3>Features</h3>" + '<ul>' + featureList + '</ul>';
    
        let paraPrice = document.createElement('p');
        let paraPriceId = document.createAttribute('id');
        paraPriceId.value = 'card-price';
        paraPrice.setAttributeNode(paraPriceId);
        paraPrice.innerHTML = "<h3>Price</h3>" + productInfo[i]["price"];
    
        cardDiv.appendChild(h2);
        cardDiv.appendChild(img);
        cardDiv.appendChild(paraDescription);
        cardDiv.appendChild(paraFeatures);
        cardDiv.appendChild(paraPrice);
    
        containerDiv.appendChild(cardDiv);
    }
}


//button functionality
document.querySelector('#button-left').addEventListener('click', moveCard);
document.querySelector('#button-right').addEventListener('click', moveCard);
document.querySelector('#button-left').addEventListener('mouseover', e=>e.target.style.backgroundColor = "#FFFBBB");
document.querySelector('#button-right').addEventListener('mouseover', e=>e.target.style.backgroundColor = "#FFFBBB");
document.querySelector('#button-left').addEventListener('mouseleave', e=>e.target.style.backgroundColor = "");
document.querySelector('#button-right').addEventListener('mouseleave', e=>e.target.style.backgroundColor = "");

function moveCard(e){
    if(e.target.id == 'button-left' && currentCard >= 0){
        currentCard--;
        if(currentCard == 0) {
            document.querySelector('#button-left').style.display = 'none';
        }
        if(currentCard == 3) {
            document.querySelector('#button-right').style.display = 'block';
        }
        document.querySelectorAll('.container-structure-item2 div').forEach(element=>{
            element.style.display = "none";
            if(element === document.querySelector(".card" + currentCard)){
                element.style.display = "";
            }
        });
    }else if (e.target.id == 'button-right' && currentCard < 4){
        currentCard++;
        if(currentCard == 4) {
            document.querySelector('#button-right').style.display = 'none';
        }
        if(currentCard == 1) {
            document.querySelector('#button-left').style.display = 'block';
        }
        document.querySelectorAll('.container-structure-item2 div').forEach(element=>{
            element.style.display = "none";
            if(element === document.querySelector(".card" + currentCard)){
                element.style.display = "";
            }
        });
    }
}

