const ratingInput = document.getElementById("rating");
const ratingValue = document.getElementById("ratingValue");

ratingInput.addEventListener("input", function () {
  ratingValue.textContent = ratingInput.value;
});
