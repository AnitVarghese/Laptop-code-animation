const powerSwitch = document.getElementById("powerSwitch");
const lid = document.getElementById("lid");
const keyboard = document.getElementById("keyboard");
const terminal = document.getElementById("terminal");
const keys = document.querySelectorAll(".key");

//dis sum COD shii lmao hahha. iluvit!! BRAVO 6 GOING DARK 
const codeLines = [
  'AUTH > Secure channel established.',
  'AUTH > Encryption protocol: AES-256 active.',
  'LINK > SatCom uplink acquired.',
  'GPS > Coordinates locked: 35.6895° N, 139.6917° E',
  'OPS > Loading mission parameters...',
  'OPS > Uploading tactical map...',
  'OPS > Calculating infiltration route...',
  'OPS > Route confirmed: STEALTH PROTOCOL ENABLED',
  'TEAM > Alpha Squad: Position green.',
  'TEAM > Bravo Squad: Position green.',
  'TEAM > Charlie Squad: Holding pattern.',
  'MISSION > Operation Silent Strike initiated...',
  'LIVE > Put on the night vision goggles.',
  'LIVE > Tango down.',
  'MISSION > Objective Alpha secured.',
  'MISSION > Breach point cleared.',
  'MISSION > Secondary target neutralized.',
  'SYS > Extraction team en route.',
  'SYS > Hostiles in pursuit.',
  'SYS > Countermeasures deployed.',
  'MISSION > All objectives complete.',
  'SYS > Exfiltration underway...',
  'SYS > Operation terminated.',
  'all units RTB!',
  'Operation Successful.',
  'SYSTEM > Shutting down terminal...',
  'SYSTEM > Powering off in t-2 seconds.',
];



let typingTimeout;
let currentLine = 0;
let currentChar = 0;
let isTyping = false;

function typeChar() {
  if (currentLine >= codeLines.length) return;

  let line = codeLines[currentLine];
  
  terminal.textContent += line[currentChar] || '';
  terminal.scrollTop = terminal.scrollHeight; 
  currentChar++;

  if (currentChar < line.length) {
    typingTimeout = setTimeout(typeChar, 20); 
  } else {
    terminal.textContent += "\n";
    currentLine++;
    currentChar = 0;
    typingTimeout = setTimeout(typeChar, 90); 
  }
}

function typeChar() {
  if (!isTyping) return;

  if (currentChar < codeLines[currentLine].length) {
    terminal.textContent += codeLines[currentLine][currentChar];
    currentChar++;

    let lineHeight = parseInt(getComputedStyle(terminal).lineHeight);
    requestAnimationFrame(() => {
      terminal.scrollTop = terminal.scrollHeight - terminal.clientHeight + (lineHeight * 1);
    });

    typingTimeout = setTimeout(typeChar, 20); 
  } 
  else {
    terminal.textContent += "\n";
    currentLine++;
    currentChar = 0;

    if (currentLine < codeLines.length) {
      typingTimeout = setTimeout(typeChar, 90); 
    } 
    else {
      isTyping = false;
      setTimeout(() => {
        terminal.textContent += "MISSION COMPLETE\n";
       
        setTimeout(() => {
          powerSwitch.checked = false; 
          powerSwitch.dispatchEvent(new Event("change")); 
        }, 3000);
      }, 500);
    }
  }
}
function startTyping() {
  terminal.textContent = "";
  currentLine = 0;
  currentChar = 0;
  isTyping = true;
  typeChar();
}

powerSwitch.addEventListener("change", () => {
  if (powerSwitch.checked) {
    lid.style.transform = "rotateX(0deg)";
    keyboard.style.display = "block";
    keys.forEach(k => k.classList.add("on"));
    setTimeout(startTyping, 1000);
  } 
  else {
    lid.style.transform = "rotateX(90deg)";
    keys.forEach(k => k.classList.remove("on"));
    keyboard.style.display = "none";
    clearTimeout(typingTimeout);
    terminal.textContent = "";
    isTyping = false;
  }
});

