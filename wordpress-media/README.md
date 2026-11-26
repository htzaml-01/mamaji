# Gambar Siap Upload ke WordPress Media Library

Semua gambar yang dipakai di website **Rendang Mamaji** sudah dipisahkan dan diberi nama file yang rapi (tanpa spasi) di folder ini:

| No | Nama File | Dipakai di Section |
| --- | --- | --- |
| 1 | `rendang-mamaji-hero.jpg` | `02-hero-banner.html` (Banner Hero Utama) |
| 2 | `rendang-mamaji-klasik.jpg` | `03-showcase-carousel.html` (Carousel Slide 1) |
| 3 | `rendang-mamaji-komplit.jpg` | `03-showcase-carousel.html` (Carousel Slide 2) |
| 4 | `rendang-mamaji-bumbu-pekat.jpg` | `03-showcase-carousel.html` (Carousel Slide 3) |
| 5 | `rendang-mamaji-hantaran.jpg` | `03-showcase-carousel.html` (Slide 4) & `04-split-kemasan-marquee.html` |

## Cara Upload & Panggil di WordPress / Elementor
1. Buka **WP Admin → Media → Add New (Tambah Baru)**.
2. Pilih semua 5 file `.jpg` dari folder `c:\Rendang\wordpress-media\` sekaligus (`Ctrl + A`) lalu upload.
3. Klik masing-masing gambar di Media Library, salin **File URL**-nya (contoh: `https://domainanda.com/wp-content/uploads/2026/11/rendang-mamaji-hero.jpg`).
4. Ganti nilai `src="..."` pada widget HTML Elementor `02`, `03`, dan `04` sesuai tabel di atas.
