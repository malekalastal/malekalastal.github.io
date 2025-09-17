const fileInput = document.getElementById('fileUpload');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    alert("تم رفع الصورة: " + file.name);
  }
});
