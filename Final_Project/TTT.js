let board=document.getElementById("board");
let context=board.getContext("2d");
let  data = [];
let  clickCount = 0;
let  boardWidth = 600;
let  interval =200;
let isEnd = false;
let  Player1 = 'black';
let  Player2 = 'yellow';  
let x1, y1; 
////taken from https://www.w3schools.com/tags/canvas_beginpath.asp             
drw_table();
function drw_table() {
 for (let  i = 0; i <= boardWidth;) {
     context.beginPath();
     context.lineWidth="2px";
     context.strokeStyle="black"; 
     context.moveTo(i,0);
     context.lineTo(i,boardWidth);
     context.stroke(); 
     context.beginPath();
     context.lineWidth="2px";
     context.moveTo(0,i);
     context.lineTo(boardWidth,i);
     context.stroke(); 
     i = i+200;
 }
}

function clickEvent(e)
{
    if (!isEnd) {
        x1=e.clientX;
        y1=e.clientY;

        
        for (let  i = 0; i < boardWidth;) {
            if (x1>=i&&x1<i+200/4) {
                x1 = i+200/2;
                break;
            }
            if (x1>=i+200/4&&x1<=i+200) {
                x1 = i+200/2;
                break;
            }
            i = i+200;
        }
        for (let  i = 0; i < boardWidth;) {
            if (y1>=i&&y1<i+200/4) {
                y1 = i+200/2;
                break;
            }
            if (y1>=i+200/4&&y1<i+200) {
                y1 = i+200/2;
                break;
            }
            i = i+200;
        }
        if (!validateData(x1,y1)) {
            let  isTrue = true;
            if (clickCount%2==0) {
                context.fillStyle=Player1;
            }else{
                context.fillStyle=Player2;
                isTrue = false;
            }
            context.beginPath();
            context.arc(x1,y1,50,0,Math.PI*2,true);
            context.closePath();
            context.fill();
            data.push({'x':x1,'y':y1,'isTrue':isTrue});
            clickCount++;
            if(isOver(x1,y1,isTrue)){
                isEnd = true;
                if (isTrue) {
                    alert('Player1 Win!');
                   
                    

                }else{
                    alert('Player2 Win!');
                   
                    
                }
            }
        }   
    }  
}
function reStart() {
context.clearRect(0,0,boardWidth,boardWidth);
drw_table();
data = [];
clickCount=0;
isEnd = false;
}
function validateData(x,y){
for (let  i = 0; i < data.length; i++) {
if (data[i].x ==x && data[i].y == y) {
    return true;
}
}
return false;
}

function validateDataIsTrue(x,y,isTrue){
for (let  i = 0; i < data.length; i++) {
if (data[i].x ==x && data[i].y == y &&data[i].isTrue == isTrue) {
    return true;
}
}
return false;
}
function isOver(x1,y1,isTrue) {
x2 = x3 = x4 = x5 = x1;
y2 = y3 = y4 = y5 = y1;

//Determines the horizontal of the current point
if (x1>=(3*200)-100) {
x2 = x1-2*200;
}else{
x2 = 100;
}
lineCount = 0;
for (let  i = 0; i < 3; i++) {
tempx = x2+200*i;
if (validateDataIsTrue(tempx,y2,isTrue)) {
    lineCount++;
    if (lineCount==3) {
        break;
    };
}else{
    lineCount=0;
}
}
if (lineCount>=3) {
return true;
}
//Determines the verticality of the current point
if (y1>=(3*200)-100) {
y3 = y1-2*200;
}else{
y3=100;
}
lineCount = 0;
for (let  i = 0; i < 3; i++) {
tempy = y3+200*i;
if (validateDataIsTrue(x3,tempy,isTrue)) {
    lineCount++;
    if (lineCount==3) {
        break;
    };
}else{
    lineCount=0;
}
}
if (lineCount>=3) {
return true;
}
//Determines the backslope of the current point
if (x1>=(3*200)-100) {
if(y1>=(3*200)-100){
    x4=x1-2*200;
    y4=y1-2*200;
    }
}else{
   x4=100;
   y4=100;
   }
lineCount = 0;
for (let  i = 0; i < 20; i++) {
tempy = y4+200*i;
tempx = x4+200*i;
if (validateDataIsTrue(tempx,tempy,isTrue)) {
    lineCount++;
    if (lineCount==3) {
        break;
    };
}else{
    lineCount=0;
}
}
if (lineCount>=3) {
return true;
}
// Determines the backslope of the current point
if (x1>=(3*200)-100) {
if(y1>=(3*200)-500){
    x5=x1-2*200;
    y5=y1+2*200;
    }
}else{
   x5=100;
   y5=500;
   }
lineCount = 0;
for (let  i = 0; i < 10; i++) {
tempy = y5-200*i;
tempx = x5+200*i;
if (validateDataIsTrue(tempx,tempy,isTrue)) {
    lineCount++;
    if (lineCount==3) {
        break;
    };
}else{
    lineCount=0;
}
}
if (lineCount>=3) {
return true;
}
}

     