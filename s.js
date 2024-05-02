
let canvas=    document.querySelector('canvas')
   let ctx=       canvas.getContext('2d')
   ctx.fillStyle='red'
let snakeCells=[[0,0]]
let cell=50
let count=0;

let direction='right'
let gameOver=false

let foodCell=generateRandomCell()
let id=     setInterval(() => {
    draw();
    update();
    
}, 50);




document.addEventListener('keydown',(e)=>{
    // console.log(e,'chal gyaaaa');
    if(e.key==='ArrowDown'){
        direction='down'
    }
   else if(e.key==='ArrowUp'){
    direction='Up'
   }
   else if( e.key==='ArrowLeft'){
    direction='left'
   }
   else{
    direction='right'
   }

})


function draw(){

    if(gameOver){
        clearInterval(id)
        ctx.fillText('game over', 50,100)
        return
    }
    ctx.clearRect(0,0,1800,900)
    for(let i of snakeCells){
        ctx.fillStyle='black'
        ctx.fillRect(i[0],i[1],cell,cell)

    }
ctx.fillStyle='red'
    ctx.fillRect(foodCell[0],foodCell[1],cell,cell)
    
}
function update(){
     let headX=  snakeCells[snakeCells.length-1][0]
    let headY=   snakeCells[snakeCells.length-1][1]

    let newX
    let newY

    if(direction==='right'){
        newX=headX+cell
        newY=headY
        if(newX===1800){
            gameOver=true
        }
    }
    else if( direction==='Up'){
        newX =headX
        newY=headY-cell
        if(newY<0){
            gameOver=true
        }
    }
    else if( direction ==='left'){
        newX=headX-cell
        newY=headY
        if(newX<0){
            gameOver=true
        }
    }
    else{
        newX =headX
        newY=headY+cell
        if(newY===900){
            gameOver=true

        }
    }

    snakeCells.push([newX,newY])

    if(newX===foodCell[0]  && newY ===foodCell[1]){
        foodCell=generateRandomCell()
        count++
    }
    else{
        snakeCells.shift()

    }

}


function generateRandomCell() {
  return [
    Math.round((Math.random()*(1750))/cell)*cell,
    Math.round((Math.random()*(850))/cell)*cell
  ]
}