const imagesContainer = document.getElementById("pic-container");
const loading = document.getElementById("loading");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=FHabZQ8zHZwmC0eytkdU6BJL8tF3CLMtNwDcppykmd4&count=${count}`;

function showLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loading.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=FHabZQ8zHZwmC0eytkdU6BJL8tF3CLMtNwDcppykmd4&count=${count}`;
  }
}
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
function displayImages() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, { href: photo.links.html, target: "_blank" });
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", showLoaded);
    item.appendChild(img);
    imagesContainer.appendChild(item);
  });
}
async function fetchImages() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayImages();
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    fetchImages();
  }
});

fetchImages();
