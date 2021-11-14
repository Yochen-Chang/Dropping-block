// Demo
let demoBlocks = document.querySelectorAll(".demoBlock");
let demo = document.querySelector("#demo");
let demoShow = document.querySelector("#demoShow");
let blocksize = 80;
let demoLeft = demo.offsetLeft;
let demoTop = demo.offsetTop;
let currentPosition = [0, 0];
let floating;
let blockShowing = document.querySelector("#blockShowing");

demo.addEventListener("mousedown", (e) => {
  // Hide the clicked block
  [x, y] = blockPosition(e);
  demoBlocks[x + 3 * y].classList.remove("active");
  // Show the floating block
  blockShowing.innerHTML = `
    <div class="floatingBlock testblock" style="left: ${
      e.pageX - demoLeft - blocksize / 2
    }px; top: ${e.pageY - demoTop - blocksize / 2}px"></div>
  `;
  // Update the current location
  currentPosition = blockPosition(e);
  // Turn on floating mode
  floating = 1;
});

// TODO: block leave demoarea
demo.addEventListener("mousemove", (e) => {
  if (floating == 1) {
    blockShowing.innerHTML = `
      <div class="floatingBlock testblock" style="left: ${
        e.pageX - demoLeft - blocksize / 2
      }px; top: ${e.pageY - demoTop - blocksize / 2}px"></div>
    `;
  }
});

// TODO: determine drop-allowable
// TODO: auto fit
demo.addEventListener("mouseup", (e) => {
  // Show the droped block
  [x, y] = blockPosition(e);
  demoBlocks[x + 3 * y].classList.add("active");
  // Detect the direction of block moving
  if (currentPosition != blockPosition(e)) {
    let blockDiretion;
    if (currentPosition[0] > blockPosition(e)[0]) {
      demoShow.innerHTML = `you drop block on LEFT direction`;
    } else if (currentPosition[0] < blockPosition(e)[0]) {
      demoShow.innerHTML = `you drop block on RIGHT direction`;
    } else if (currentPosition[1] > blockPosition(e)[1]) {
      demoShow.innerHTML = `you drop block on UP direction`;
    } else if (currentPosition[1] < blockPosition(e)[1]) {
      demoShow.innerHTML = `you drop block on DOWN direction`;
    }
    currentPosition = blockPosition(e);
  }
  // Hide floating block
  blockShowing.innerHTML = ``;
  // Turn off the floating mode
  floating = 0;
});

function blockPosition(arrow) {
  let x = Math.ceil((arrow.pageX - demoLeft) / blocksize) - 1;
  let y = Math.ceil((arrow.pageY - demoTop) / blocksize) - 1;
  return [x, y];
}
