const windowWidth=window.innerWidth;
const windowHeight=window.innerHeight;


const canvas=document.querySelector('.canvas');
const ctx=canvas.getContext('2d');
//canvas width height for game unrelated to pixels
const cWidth=canvas.width=1000;
const cHeight=canvas.height=1000;

//key inputs
class inputHandler{
    constructor(){
        this.keys=[];

        window.addEventListener('keydown',e=>{

            //inputting key pressed into array
            if(
                e.key==='ArrowDown' && this.keys.indexOf(e.key)===-1||
                e.key==='ArrowUp' && this.keys.indexOf(e.key)===-1||
                e.key==='ArrowLeft' && this.keys.indexOf(e.key)===-1||
                e.key==='ArrowRight' && this.keys.indexOf(e.key)===-1
              ){
                this.keys.push(e.key);
            }
            
        });

        window.addEventListener('keyup',e=>{

            //clearing key from array because key was released
            if((e.key==='ArrowDown' || 
                e.key==='ArrowUp'   || 
                e.key==='ArrowLeft' || 
                e.key==='ArrowRight'))
            {
                this.keys.splice(this.keys.indexOf(e.key),1);
            }
        });
    //constructor end
    }
//class end
}
//contains array(keys[]) of keys that are currently down
const inputs=new inputHandler();



//player
const snakeAss=new Image();
snakeAss.src='snakeAss.png';

class SnakySnake{
    constructor(){

        this.position=[{x:150,y:0},{x:100,y:0},{x:50,y:0},{x:0,y:0}];
        this.head=this.position.length-1;
    }

    update(){
        // move 

        inputs.keys.forEach((key)=>{
            //
            for(let i=this.position.length-2;i>=0;i--){
                this.position[i+1]={...this.position[i]}
            }

           //    updating head
            if(key==='ArrowUp'){
                
                this.position[0].y-=50;
            }
            if(key==='ArrowDown'){

                this.position[0].y+=50; 
            }
            if(key==='ArrowLeft'){

                this.position[0].x-=50;
            }
            if(key==='ArrowRight'){

                this.position[0].x+=50;
            }

        });
    }
    draw(){
        this.position.forEach(p => {
            ctx.drawImage(snakeAss,p.x,p.y);
        });
    }
    add(){
        let temp={...this.position[this.head]};
        this.position.push(temp);
    }
    remove(){
        this.position.splice(this.position.length-1,1);
    }

}


//food
const foodImage=new Image();
foodImage.src='good.png';
class GoodFood{
    constructor(){
        this.position={x:200,y:200};
    }
    update(){
        this.position.x=Math.floor((Math.random()*10)+(Math.random()*10))*50;
        this.position.y=Math.floor((Math.random()*10)+(Math.random()*10))*50;
    }
    draw(){
        ctx.drawImage(foodImage,this.position.x,this.position.y);
    }
}
const food =new GoodFood();

//bad food
const badFoodImage=new Image();
badFoodImage.src='bad.png';
class BadFood{
    constructor(){
        this.position={x:600,y:600};
    }
    update(){
        this.position.x=Math.floor((Math.random()*10)+(Math.random()*10))*50;
        this.position.y=Math.floor((Math.random()*10)+(Math.random()*10))*50;
    }
    draw(){
        ctx.drawImage(badFoodImage,this.position.x,this.position.y);
    }
}
const badFood =new BadFood();


const crackHead=new SnakySnake();
//fps controle
let then=Date.now();
let now;
let fps=5;
let score=0;
//gameloop
function animate(){
    //fps controle
    now=Date.now();
    let difference=now-then; 
    if(difference>1000/fps){
        then=now;

        ctx.clearRect(0,0,cWidth,cHeight);
        crackHead.draw();
        crackHead.update();

        food.draw();
        badFood.draw();

        if(crackHead.position[0].x===food.position.x && crackHead.position[0].y===food.position.y ){
            crackHead.add();
            crackHead.add();
            crackHead.add();
            food.update();
            badFood.update();
            score++;
        }
        if(crackHead.position[0].x===badFood.position.x && crackHead.position[0].y===badFood.position.y ){
            crackHead.remove();
            crackHead.remove();
            badFood.update();
            food.update();
            score--;
        }
        if(score===10){
            fps+=3;
            score=0;
        }

    }
    requestAnimationFrame(animate);
}
animate();