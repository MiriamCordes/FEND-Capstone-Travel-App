async function loadImage(location) {
  const response = await fetch("http://localhost:8080/loadImage/" + location);
  try {
    const imageData = await response.json();
    return imageData;
  } catch (error) {
    console.log("Error loading image: ", error);
  }
}

export { loadImage };
