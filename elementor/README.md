# Panduan Pasang Custom HTML Rendang Mamaji di Elementor

Setiap section sudah dipisah menjadi file **Custom HTML mandiri** (menggunakan prefix class `.rmm-*` agar tidak bentrok dengan CSS tema WordPress Anda).

## Urutan File Section
1. `01-header-navbar.html` — Topbar kuning + menu mobile
2. `02-hero-banner.html` — Banner hero + hotspot tombol `ORDER NOW` + notch panah bawah
3. `03-showcase-carousel.html` — Judul *Masakan Minang. Kehangatan Rumah.*, infinite auto-carousel 4 foto, & manifesto
4. `04-split-kemasan-marquee.html` — Split 50/50 *Siap Saji & Kemasan Vacuum* + strip marquee berjalan
5. `05-keunggulan-craft.html` — 3 pilar keunggulan *Kenapa Rendang Mamaji*
6. `06-kemitraan-lokasi.html` — Kartu *Pesan Antar & Hampers* dan *Dapur & Kemitraan*
7. `07-footer.html` — Footer cokelat espresso

## Cara Memasang di Elementor
1. Di halaman Elementor, ubah **Page Layout** ke **Elementor Canvas** (agar header/footer tema WordPress bawaan tidak dobel, atau **Elementor Full Width** jika header/footer memakai Theme Builder).
2. Untuk setiap section, buat **Container baru**:
   - **Content Width**: `Full Width`
   - **Padding** (Tab Advanced): `0` di semua sisi (`Top: 0, Right: 0, Bottom: 0, Left: 0`)
   - **Gap** antar elemen: `0`
3. Tarik widget **HTML** (*Custom HTML*) ke dalam container tersebut, lalu copy-paste isi file `01-...` sampai `07-...` satu per satu ke container masing-masing.
4. **URL Gambar & Nomor WhatsApp**:
   - Gambar saat ini mengarah ke URL GitHub repo Anda (`https://raw.githubusercontent.com/htzaml-01/mamaji/main/Asset/...`). Anda juga bisa menggantinya dengan URL dari **WordPress Media Library** setelah upload gambar ke WP Admin.
   - Nomor WhatsApp sudah diarahkan ke `082323183770` (`https://wa.me/6282323183770`) dan alamat `Singapadu Riverview no.10 Gianyar Bali` langsung mengarah ke Google Maps.
