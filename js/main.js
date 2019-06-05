//MAP
let map = document.querySelector('.map');
for(let i = 1; i < 181; i++) {
    let block = document.createElement('div');
        block.classList.add('block');
        map.appendChild(block);
}

let x = 1, y = 18,
    block = document.querySelectorAll('.block');
for(let i = 0; i < block.length; i++) {
    if(x > 10){
        x = 1;
        y--;
    }
    block[i].setAttribute('posX', x),
    block[i].setAttribute('posY', y);
    x++;
}
//Map end*//


let posDetail = [5,17],
    detailFalling = [];
    detailFalling.unshift(document.querySelector(`[posX = '${posDetail[0]}'][posY = '${posDetail[1]}']`)),
    dropped = true, //revers value
    MoveItemLeft = true,
    MoveItemRight = true,
    rotateItem = true;

let details = {
    t: [
        [[1,0],
         [-1,0],
        [0,-1]],
        //default
        [[0,1],
        [0,-1],
        [-1,0]],
        //left
        [[1,0],
        [-1,0],
        [0,1]],
        //down
        [[1,0],
        [0,-1],
        [0,1]]
        //right
    ],
    o: [
        [[1,0],
        [0,-1],
        [1,-1]]
    ],
    s: [
        [[1,0],
        [0,-1],
        [-1,-1]],
        //default
        [[0,-1],
        [-1,0],
        [-1,1]]
        //down
    ],
    z: [
       [ [-1,0],
        [0,-1],
        [1,-1]],
        //default
        [[-1,-1],
        [-1,0],
        [0,1]]
        //down
    ],
    l: [
        [[-1,0],
        [1,0],
        [-1,-1]],
        [[0,1],
        [-1,1],
        [0,-1]],
        [[-1,0],
        [1,0],
        [1,1]],
        [[0,1],
        [0,-1],
        [1,-1]]
        

    ],
    j: [
        [[-1,0],
        [1,0],
        [1,-1]],
        [[0,1],
        [0,-1],
        [-1,-1]],
        [[-1,0],
        [1,0],
        [-1,1]],
        [[0,1],
        [0,-1],
        [1,1]]
    ],
    i: [
        [[1,0],
        [2,0],
        [-1,0]],
        [[0,1],
        [0,2],
        [0,-1]]

    ],

},
items = [details.t, details.o, details.s, details.z, details.l, details.j, details.i],
itemSide = 0,
randomItem = Math.floor(Math.random() * (7 - 1)),
droppedItem = items[0][itemSide], // [itemSide] items[randomItem]

render = (detail) => {
    detail.forEach((item) => {
            posX = detailFalling[0].getAttribute('posX'),
            posY = detailFalling[0].getAttribute('posY'),
            renderDetail = document.querySelector(`[posX = '${Number(posX)+Number(item[0])}'][posY = '${Number(posY)+Number(item[1])}']`);
            detailFalling.push(renderDetail);
    });
    detailFalling.forEach((item) => {
        item.classList.add('detail-block');
    });
    
};
lineFade = (num) => {
    let freezBlockLine =  document.querySelectorAll(`[posY = '${num}']`),
        lineBlock = 0;
    freezBlockLine.forEach((item) => {
            if(item.classList.contains('freez-block')){
                lineBlock += 1;
            }
    });
        if(lineBlock == 10){
            for(i = 0; i < freezBlockLine.length; i++){
            freezBlockLine[i].classList.remove('freez-block');
            }
            console.log('Delete line!');
            lineBlock = 0;

        let freezBlock = document.querySelectorAll('.freez-block');
            newFreezBlock = []; 
        freezBlock.forEach((item) => {
            posX = item.getAttribute('posX'),
            posY = item.getAttribute('posY');
            item.classList.remove('freez-block');
            if(posY >= num){
                newFreezBlock.push(document.querySelector(`[posX = '${Number(posX)}'][posY = '${Number(posY) - Number(num)}']`));
            }
        });
                
        newFreezBlock.forEach((item) => {
            item.classList.add('freez-block');
        });
        }
        
        
       
        
};


render(droppedItem);
let detailMove = (right, down) => {
    for(i = 0; i < 18; i++){
        lineFade(i);
    }
    
    let posX = detailFalling[0].getAttribute('posX'),
        posY = detailFalling[0].getAttribute('posY');

        droppedItem = items[randomItem][itemSide]

    if(dropped == true){
        detailFalling.forEach((item) =>{
            item.classList.remove('detail-block');
        });
        detailFalling = [];
        detailFalling.unshift(document.querySelector(`[posX = '${Number(posX)+right}'][posY = '${Number(posY)+Number(down)}']`));
        MoveItemRight = true;
        MoveItemLeft = true;
        render(droppedItem);
    } else {
        detailFalling.forEach((item) =>{
            item.classList.remove('detail-block');
            item.classList.add('freez-block');
        });
        detailFalling = [];
        detailFalling.unshift(document.querySelector(`[posX = '${posDetail[0]}'][posY = '${posDetail[1]}']`));
        dropped = true;
        randomItem = Math.floor(Math.random() * (7 - 1)) + 1;
    }
    
    let freezBlock = document.querySelectorAll('.freez-block');
    detailFalling.forEach((item) => {
        posX = item.getAttribute('posX'),
        posY = item.getAttribute('posY');
        if(posY == 1){
            dropped = false;
            itemSide = 0; 
        }

        if(posX == 1){
            MoveItemLeft = false;
        }
        
        if(posX == 10) {
            MoveItemRight = false;
        }
        
        for(i = 0; i < freezBlock.length; i++){
            posXFreez = freezBlock[i].getAttribute('posX'),
            posYFreez = freezBlock[i].getAttribute('posY');
            if(posYFreez == Number(posY)-1 && posXFreez == posX){
                dropped = false;
                itemSide = 0; 
                break;
            }
        }
    });
},
moveInterval = setInterval(()=>{
    detailMove(0, -1);
}, 300);
window.addEventListener('keydown', e => {
    if(e.keyCode === 37) {
        let posX;
        detailFalling.forEach((item)=>{
            posX = item.getAttribute('posX');
        });
        if(MoveItemLeft){
            detailMove(-1, 0);
            MoveItemRight = true;
        }
    } else if(e.keyCode === 39){
        let posX;
        detailFalling.forEach((item)=>{
            posX = item.getAttribute('posX');
        });
        if(MoveItemRight){
            detailMove(1, 0);
            MoveItemLeft = true;
        }
    } else if(e.keyCode === 40){
        detailMove(0, -1);
    } else if(e.keyCode === 32){
        if(itemSide < items[randomItem].length-1){
            itemSide += 1;
        } else if(itemSide == items[randomItem].length-1){
            itemSide = 0;
        }  
        console.log('itemSide:  '+itemSide);
        console.log('droppedItem.length:  '+items[randomItem].length);
    }
});
window.addEventListener('keyup', e => {
    if(e.keyCode === 37) {
        playerMove = 0;
    } else if(e.keyCode === 39){
        playerMove = 0;
    } else if(e.keyCode === 40){
    }
});