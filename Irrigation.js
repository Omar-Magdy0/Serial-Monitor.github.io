window.onload = async function() {
    

  baud = document.getElementById('baud');
  baudValue = baud.value;
  
  baud.addEventListener('blur',()=>{baudValue = baud.value;})
    document.getElementById('connect').addEventListener('click', async () => {
      
      const filters = [
        { usbVendorId: 0x2341, usbProductId: 0x0043 },
        { usbVendorId: 0x2341, usbProductId: 0x0001 },{ usbVendorId: 0x067b, usbProductId: 0x2303 }
      ];
  

      const port = await navigator.serial.requestPort({ filters });
      const { usbProductId, usbVendorId } = port.getInfo();

      const ports = await navigator.serial.getPorts();
    

      // Wait for the serial port to open.
      await port.open({ baudRate: baudValue });
    msg = document.getElementById('dicMessage');
    nav  = document.getElementById('navBar');
    disp = document.getElementById('displayer');
    body = document.querySelector('body');
    showContainer = document.createElement('div');

    navigator.serial.addEventListener("disconnect", () => {document.body.setAttribute("style","background-color: rgb(109, 109, 109)")
        disp.setAttribute("style","width:100%;height: calc(100% - 70px);display :fixed;position: fixed;font-size: 22px;");
        nav.setAttribute("style","width: 100%;height: 70px;background-color: rgb(126, 195, 255);");
        msg.style.display = "block";
        showContainer.setAttribute("style","display : none;")
        
      });


  if(port.readable){

 
  //REAL CODE IS HERE

  // Modifications to when we connect 
 document.body.setAttribute("style","background : rgba(50,50,50,1) no-repeat top right ;background-size : cover;background-attachment: fixed;background-clip: border-box;") 
nav.setAttribute("style","background-color : rgba(0, 206, 132, 0.5);")
msg.style.display = "none";



showContainer.setAttribute("id","showContainer");
document.body.appendChild(showContainer);
showScreen = document.createElement('pre');
showContainer.appendChild(showScreen);
showScreen.setAttribute("id","showScreen");
writeScreen = document.createElement('input');
showContainer.appendChild(writeScreen);
writeScreen.setAttribute("style","all : unset;width: 97% ;height : 12%; margin : auto;overflow-y :auto;background-color:rgba(200, 200, 200, 0.9);padding : 1.5%;border = 0px ;font-size : 20px;color:black;font-family : 'Times New Roman', Times, serif");







var tmp =""; 



// Listen to data coming from the serial device.

const textDecoder = new TextDecoderStream();
const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
const reader = textDecoder.readable.getReader();
async function read(){ 
// Listen to data coming from the serial device.
for(;true;) {
  const { value, done } = await reader.read();
  if (done) {
    // Allow the serial port to be closed later.
    reader.releaseLock();
    break;
  }
  // value is a string.
  tmp = document.createTextNode(value);
  showScreen.appendChild(tmp);setTimeout(()=>{showScreen.scrollTop = showScreen.scrollHeight},500)
}


}

const textEncoder = new TextEncoderStream();
const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
const writer = textEncoder.writable.getWriter();
async function write (x){ 
  writer.write(x);
}







function setFarmSettings(crop1,crop2,interval){
  write("1"+"\n\n\n\n"+crop1+"\n"+crop2+"\n"+interval+"\n\n")}


setFarmSettings("cucumber","watermelon",200);
writeScreen.addEventListener("keydown",(e)=>{if(e.key === "Enter"){inp = writeScreen.value;writer.write(inp+"\n");console.log(inp);writeScreen.value = '';}});


read();











}}
)}

