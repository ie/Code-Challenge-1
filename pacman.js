(function(){
const commands = ["move","right", "left", "place", "report"]
const directions = ["up", "down", "left", "right"]
const pacmans = [];
const pacmanElement= document.getElementById("pacman");
class Pacman {
  
  constructor(x, y, f) { 
    this.x = x
    this.y =y
    this.f = f 
  }

  placePacman()  {
    const { x, y, f } = this;
    reset();
    document.getElementById(String(y)+String(x)).innerHTML = `<i class="fab fa-codiepie ${f}" id="pacman"></i>`;
  }

  move() {
    switch (this.f) {
      case "right":
        this.x = (++this.x > 4) ? 4 : this.x;
        break;
      case "left":
        this.x = (--this.x < 0) ? 0 : this.x;
        break;
      case "up":
        this.y = (++this.y > 4) ? 4 : this.y;
        break;
      case "down":
        this.y = (--this.y < 0) ? 0 : this.y;
        break;
    }
    this.placePacman()
  }

  rightFunc() {
    const right = {
      up:"right",
      right:"down",
      down:"left",
      left:"up",
    }
    this.f = right[this.f];
    this.placePacman()
  }

  leftFunc() {
    const left = {
      up:"left",
      right:"up",
      down:"right",
      left:"down",
    }
    this.f = left[this.f];
    this.placePacman()
  }

  report() {
    document.getElementsByClassName("report")[0].innerText = `Pacman is at X = ${this.x} & Y = ${this.y} facing ${this.f.toUpperCase()}`
  }
}
// let pac = new Pacman(1,1,"up")
const reset = () => {
  const tds = document.getElementsByTagName("td")
  Array.from(tds).forEach( td => td.innerHTML = "")
}

const pacmanPlacer = () =>{ // button Input
  let x = +document.getElementById("x").value
  let y = +document.getElementById("y").value
  let f = document.getElementById("face").value
  createPacman(x, y, f);
}

const run = () => { //commandline Logic
  const cmdElem = document.getElementById("command");
  let cmd = cmdElem.value.trim().split(" ");
  let commandInp = cmd[0].trim().toLowerCase();
  cmdElem.value = "";
  if(!commands.includes(commandInp)) return false;
  if(commandInp === "place") { 
    if(cmd.length<2) return false;
    console.log(cmd);
    let pacmanInfo = cmd[1].split(",");
    if (pacmanInfo.length !== 3) return false;
    let  x= parseInt(pacmanInfo[0]);
    let  y= parseInt(pacmanInfo[1]);
    let  f= pacmanInfo[2].trim().toLowerCase();
    createPacman(x,y,f)
    return true;
  }
  if(cmd.length>1) return false;
  otherCommands(commandInp)
}
const otherCommands = (commandInp) => {
  if(pacmans.length!==1) return false;
  switch (commandInp) {
    case "move":
      pacmans[0].move()
      break;
    case "left":
      pacmans[0].leftFunc();
      break;
    case "right":
      pacmans[0].rightFunc();
      break;
    case "report":
      pacmans[0].report()
      break;
    default:
    return false;
  }
}
const createPacman = (x, y, f) => {
  if(!validatePacman(x, y, f)) { return false }
  pacmans[0] = new Pacman(x, y, f)
  pacmans[0].placePacman();
}
const validatePacman = (x, y, f) => {
  if( x < 0 || x > 4 || 
      y < 0 || y > 4 || 
      !Number.isInteger(x) || 
      !Number.isInteger(y) )
      { return false}
  if(!directions.includes(f)) return false;
  return true;
}
window.onload = () => {
  document.getElementById("controls").addEventListener("click", (event)=>{
    otherCommands(event.target.value)
  })
  document.getElementById("command").addEventListener("keypress",(event)=> {
    if(event.keyCode===13) run();
  })
  document.querySelector("[value='place pacman']").addEventListener("click", ()=>{
    pacmanPlacer()
} )
}
}());