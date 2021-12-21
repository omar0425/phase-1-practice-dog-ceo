const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";
const container = document.querySelector("#dog-image-container");
const ulContainer = document.querySelector("#dog-breeds");
const dropDown = document.querySelector("#breed-dropdown");
let breedsArray = [];
// Add JavaScript that:
ulContainer.addEventListener("click", handleClick);
dropDown.addEventListener("change", handleChange);

// - adds image elements to the DOM **for each** 🤔 image in the array
function getImages() {
  fetch(imgUrl) // - on page load, fetches the images using the url above ⬆️
    .then((resp) => resp.json()) // - parses the response as `JSON`
    .then((images) => {
      const imgs = images.message;
      let imgsArray = createImgElement(imgs);
      renderElement(imgsArray);
    });
}

function createImgElement(imgs) {
  return imgs.map((img) => {
    let i = `<img src =${img}>`;
    return i;
  });
}
function renderImg(imgsArray) {
  imgsArray.forEach((element) => {
    renderElement(element);
  });
}
function renderElement(element) {
  ulContainer.innerHTML += element;
}
function getBreeds() {
  fetch(breedUrl)
    .then((resp) => resp.json())
    .then((breeds) => {
      breedsArray = Object.keys(breeds.message);
      const breedsLis = createLiElement(breedsArray);
      renderLis(breedsLis);
    });
}

function createLiElement(breedsArray) {
  return breedsArray.map((breed) => {
    let li = `<li>${breed}</li>`;
    return li;
  });
}
function renderLis(breedsLis) {
  breedsLis.forEach((element) => {
    renderElement(element);
  });
}

function handleClick(event) {
  if (event.target.nodeName === "LI") {
    if (event.target.style.color === "red") {
      event.target.style.color = "black";
    } else {
      event.target.style.color = "red";
    }
  }
}
function handleChange(event) {
  const letter = event.target.value;
  const filteredBreeds = breedsArray.filter((breeds) =>
    breeds.startsWith(letter)
  );

  const filteredBreedsLis = createLiElement(filteredBreeds);
  ulContainer.innerHTML = "";
  renderLis(filteredBreedsLis);
}

getImages();
getBreeds();
// - adds image elements to the DOM **for each** 🤔 image in the array
