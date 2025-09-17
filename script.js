const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const beforeImg = document.getElementById("before-img");

dropZone.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      beforeImg.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("upscale-btn").addEventListener("click", () => {
  alert("Upscaling started... (demo only)");
});
