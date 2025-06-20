document.addEventListener("DOMContentLoaded", function () {
  // Create nature elements
  createNatureElements();

  // Setup automatic music playback
  const music = document.getElementById("wedding-music");

  // Try to play music automatically (may be blocked by browser)
  music.volume = 0.5;
  const playPromise = music.play();

  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      // Auto-play was prevented, show notification
      console.log("Autoplay prevented, please interact with page");
    });
  }

  // Setup gallery
  setupGallery();

  // Create interactive elements when music is blocked
  document.body.addEventListener(
    "click",
    function () {
      if (music.paused) {
        music.play();
      }
    },
    { once: true }
  );
});

function createNatureElements() {
  const container = document.getElementById("nature-elements");

  // Add birds
  for (let i = 0; i < 3; i++) {
    const bird = document.createElement("div");
    bird.className = "bird";
    bird.style.top = `${Math.random() * 30 + 10}%`;
    bird.style.animationDuration = `${Math.random() * 10 + 15}s`;
    bird.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(bird);
  }

  // Add leaves and flowers
  const leafTypes = ["leaf1.png", "leaf2.png"];
  const flowerTypes = ["flower1.png", "flower2.png"];

  for (let i = 0; i < 20; i++) {
    const element = document.createElement("div");
    const isLeaf = Math.random() > 0.5;
    const size = Math.random() * 30 + 20;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 5 + 5;

    element.className = isLeaf ? "leaf" : "flower";
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${left}%`;
    element.style.top = `${top}%`;
    element.style.animationDelay = `${delay}s`;
    element.style.animationDuration = `${duration}s`;
    element.style.backgroundImage = `url(assets/${
      isLeaf
        ? leafTypes[Math.floor(Math.random() * leafTypes.length)]
        : flowerTypes[Math.floor(Math.random() * flowerTypes.length)]
    })`;

    container.appendChild(element);
  }
}

function setupGallery() {
  const galleryTrack = document.querySelector(".gallery-track");

  // Add gallery items (6 images duplicated to create infinite loop)
  for (let i = 1; i <= 6; i++) {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `<img src="assets/gallery${i}.jpg" alt="Gallery ${i}">`;
    galleryTrack.appendChild(item.cloneNode(true));
    galleryTrack.appendChild(item.cloneNode(true));
  }
}
