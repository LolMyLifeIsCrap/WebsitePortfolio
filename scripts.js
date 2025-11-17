/* =========================
   VIDEO CAROUSEL (NO AUTOSCROLL)
   ========================= */
const row = document.getElementById("loopRow");
const CARD_GAP = 40; // must match gap: 40px in .showcase-row

// Right arrow – move to next card
function scrollRight() {
  if (!row || row.children.length === 0) return;

  const firstCard = row.children[0];
  const cardWidth = firstCard.getBoundingClientRect().width + CARD_GAP;

  // animate row to the left
  row.style.transition = "transform 0.3s ease";
  row.style.transform = `translateX(-${cardWidth}px)`;

  row.addEventListener(
    "transitionend",
    function handler(e) {
      if (e.propertyName !== "transform") return;

      row.removeEventListener("transitionend", handler);
      row.style.transition = "none";
      row.appendChild(firstCard);              // move first to end
      row.style.transform = "translateX(0px)"; // reset position
    },
    { once: true }
  );
}

// Left arrow – move to previous card
function scrollLeft() {
  if (!row || row.children.length === 0) return;

  const lastCard = row.lastElementChild;
  const cardWidth = lastCard.getBoundingClientRect().width + CARD_GAP;

  // put last card before the first, offset row so it looks like it came from left
  row.style.transition = "none";
  row.insertBefore(lastCard, row.firstElementChild);
  row.style.transform = `translateX(-${cardWidth}px)`;

  // then animate back to 0
  requestAnimationFrame(() => {
    row.style.transition = "transform 0.3s ease";
    row.style.transform = "translateX(0px)";
  });
}

/* =========================
   IMAGE INFINITE LOOP
   ========================= */
const imageRow = document.getElementById("imageLoopRow");

let imgScroll = 0;
let imgSpeed = 1.1;
let imageAutoplay = true;
let imageLoopId = null;

function imageStep() {
  if (!imageRow) return;

  imageRow.style.transform = `translateX(${-imgScroll}px)`;
  imgScroll += imgSpeed;

  const firstImg = imageRow.children[0];
  if (!firstImg) return;

  const imgWidth = firstImg.offsetWidth + 40;

  if (imgScroll >= imgWidth) {
    imageRow.appendChild(firstImg);
    imgScroll = 0;
    imageRow.style.transform = "translateX(0px)";
  }

  if (imageAutoplay) {
    imageLoopId = requestAnimationFrame(imageStep);
  } else {
    imageLoopId = null;
  }
}

function startImageLoop() {
  if (!imageLoopId && imageAutoplay) {
    imageLoopId = requestAnimationFrame(imageStep);
  }
}

function stopImageLoop() {
  imageAutoplay = false;
  if (imageLoopId) {
    cancelAnimationFrame(imageLoopId);
    imageLoopId = null;
  }
}

// start image autoplay
startImageLoop();

imageRow.addEventListener("mouseenter", () => {
  stopImageLoop();
});

imageRow.addEventListener("mouseleave", () => {
  imageAutoplay = true;
  startImageLoop();
});

document.querySelectorAll(".video-thumb").forEach(thumb => {
    const videoId = thumb.getAttribute("data-video");
    const img = thumb.querySelector(".thumb-img");
    img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
});

// OPEN YOUTUBE VIDEO IN MODAL
document.querySelectorAll(".video-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
        const videoId = thumb.getAttribute("data-video");
        const modal = document.getElementById("video-modal");
        const player = document.getElementById("ytPlayer");

        player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.style.display = "flex";
    });
});

// CLOSE VIDEO MODAL
function closeVideoModal() {
    const modal = document.getElementById("video-modal");
    const player = document.getElementById("ytPlayer");
    modal.style.display = "none";
    player.src = "";
}

document.querySelector('a[href="#contact"]').addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("contact-modal").style.display = "flex";
});

function closeContact() {
    document.getElementById("contact-modal").style.display = "none";
}