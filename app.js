// Demo

let demo = document.querySelector("#demo");
let demoBlocks = document.querySelectorAll(".demoBlock");
let demoContext = document.querySelector("#demoContext");
let blocksize = 80;
// CSS: width / height = 5rem
let demoLeft = demo.offsetLeft;
let demoTop = demo.offsetTop;

let currentPosition = [0, 0];
let floating;
let blockShowing = document.querySelector("#blockShowing");
let cilckedBlock;
let clickedType;
let selectBlockLeft;
let selectBlockTop;
let pasteBlock;

demo.addEventListener("mousedown", (e) => {
  // Hide the clicked block
  [x, y] = blockPosition(e);
  cilckedBlock = demoBlocks[x + 3 * y];
  clickedType = detectType(cilckedBlock);
  cilckedBlock.classList.remove(clickedType);
  // Show the floating block
  selectBlockLeft = e.pageX - demoLeft - blocksize / 2;
  selectBlockTop = e.pageY - demoTop - blocksize / 2;
  blockShowing.innerHTML = `
    <div class="floatingBlock ${clickedType}" style="left: ${selectBlockLeft}px; top: ${selectBlockTop}px"></div>
  `;
  // Turn on floating mode
  floating = 1;
});

// TODO: block leave demoarea
demo.addEventListener("mousemove", (e) => {
  if (floating == 1) {
    // update the floating block
    selectBlockLeft = e.pageX - demoLeft - blocksize / 2;
    selectBlockTop = e.pageY - demoTop - blocksize / 2;
    blockShowing.innerHTML = `
    <div class="floatingBlock ${clickedType}" style="left: ${selectBlockLeft}px; top: ${selectBlockTop}px"></div>
  `;
  }
});

// TODO: determine drop-allowable
// TODO: auto fit
demo.addEventListener("mouseup", (e) => {
  [x, y] = blockPosition(e);
  pasteBlock = demoBlocks[x + 3 * y];

  if (floating == 1) {
    // Not allowed to drop
    if (detectType(pasteBlock)) {
      cilckedBlock.classList.add(clickedType);
    } else {
      // Show the droped block
      pasteBlock.classList.add(clickedType);
    }

    // Hide floating block
    blockShowing.innerHTML = ``;
    // Turn off the floating mode
    floating = 0;
  }

  // Detect the direction of block moving
  if (currentPosition != blockPosition(e)) {
    let blockDiretion;
    if (currentPosition[0] > blockPosition(e)[0]) {
      demoContext.innerHTML = `you drop block on LEFT direction`;
    } else if (currentPosition[0] < blockPosition(e)[0]) {
      demoContext.innerHTML = `you drop block on RIGHT direction`;
    } else if (currentPosition[1] > blockPosition(e)[1]) {
      demoContext.innerHTML = `you drop block on UP direction`;
    } else if (currentPosition[1] < blockPosition(e)[1]) {
      demoContext.innerHTML = `you drop block on DOWN direction`;
    }
    currentPosition = blockPosition(e);
  }
});

function blockPosition(arrow) {
  let x = Math.ceil((arrow.pageX - demoLeft) / blocksize) - 1;
  let y = Math.ceil((arrow.pageY - demoTop) / blocksize) - 1;
  return [x, y];
}
function detectType(block) {
  if (block.classList.contains("redBlock")) {
    return "redBlock";
  }
  if (block.classList.contains("blueBlock")) {
    return "blueBlock";
  }
  return false;
}
