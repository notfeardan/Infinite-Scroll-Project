const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=FHabZQ8zHZwmC0eytkdU6BJL8tF3CLMtNwDcppykmd4&count=${count}`;

// Fetch images from Unsplash API
async function fetchImages() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const images = data.map((image) => ({
      id: image.id,
      url: image.urls.small,
      altText: image.alt_description,
      author: image.user.name,
      authorUrl: image.user.links.html,
    }));
    displayImages(images);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

fetchImages();
