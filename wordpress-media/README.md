# Gambar Siap Upload ke WordPress Media Library

Semua gambar dan logo yang dipakai di website **Rendang Mamaji / Mamaji Local Culinary** sudah dipisahkan dan diberi nama file yang rapi (tanpa spasi) di folder ini:

| No | Nama File | Dipakai di Section |
| --- | --- | --- |
| 1 | `rendang-mamaji-logo.png` | `01-header-navbar.html` & `07-footer.html` (Logo Resmi) |
| 2 | `rendang-mamaji-hero.jpg` | `02-hero-banner.html` (Banner Hero Utama) |
| 3 | `rendang-mamaji-klasik.jpg` | `03-showcase-carousel.html` (Carousel Slide 1) |
| 4 | `rendang-mamaji-komplit.jpg` | `03-showcase-carousel.html` (Carousel Slide 2) |
| 5 | `rendang-mamaji-bumbu-pekat.jpg` | `03-showcase-carousel.html` (Carousel Slide 3) |
| 6 | `rendang-mamaji-hantaran.jpg` | `03-showcase-carousel.html` (Slide 4) & `04-split-kemasan-marquee.html` |
| 7 | `rendang-mamaji-bahan-daging.jpg` | `05-keunggulan-craft.html` (Daging Sapi Segar Pilihan) |
| 8 | `rendang-mamaji-bahan-rempah.jpg` | `05-keunggulan-craft.html` (Rempah & Kelapa Murni) |
| 9 | `rendang-mamaji-proses-santan.jpg` | `05-keunggulan-craft.html` (Masak Santan & Serai) |
| 10 | `rendang-mamaji-proses-pekat.jpg` | `05-keunggulan-craft.html` (Bumbu Pekat Karamelisasi) |

## Cara Upload & Panggil di WordPress / WPCode
1. Buka **WP Admin → Media → Add New (Tambah Baru)**.
2. Pilih semua 10 file dari folder `c:\Rendang\wordpress-media\` sekaligus (`Ctrl + A`) lalu upload.
3. Klik masing-masing gambar di Media Library, salin **File URL**-nya.
4. Tempel ke blok `RMM_MEDIA` di bagian atas snippet JS WPCode (`wpcode/rendang-mamaji-global.js`).
