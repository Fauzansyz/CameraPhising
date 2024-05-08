<?php
if (isset($_POST['image'])) {
    $imageData = $_POST['image'];
    $decodedImage = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imageData));

    // Simpan gambar ke direktori
    $filePath = 'uploads/' . uniqid() . '.jpg';
    if (file_put_contents($filePath, $decodedImage)) {
        echo 'OK,Berhasil';
    } else {
        http_response_code(500);
        echo 'Gagal menyimpan gambar';
    }
} else {
    echo 'Tidak ada gambar';
}
?>