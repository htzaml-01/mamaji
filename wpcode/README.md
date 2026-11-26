# Panduan Pasang di WordPress (WPCode + Elementor)

Folder ini memisahkan **Custom CSS** dan **Custom JS** untuk dimasukkan ke plugin **WPCode** (berlaku di semua halaman / *every page*), beserta file **HTML bersih** per section untuk widget HTML Elementor.

## Langkah 1 — Masukkan Custom CSS ke WPCode
1. Di WP Admin, buka **Code Snippets → + Add Snippet → Add Your Custom Code (New Snippet)**.
2. Beri judul, misalnya: `Rendang Mamaji - Global CSS`.
3. Ubah **Code Type** menjadi **`CSS Snippet`**.
4. Copy-paste seluruh isi file `rendang-mamaji-global.css` (tanpa tag `<style>`).
5. Pada bagian **Insertion**:
   - **Insert Method**: `Auto Insert`
   - **Location**: `Site Wide Header` (atau `Frontend Only` / halaman tertentu lewat *Smart Conditional Logic*)
6. Aktifkan toggle **Active** lalu klik **Save Snippet**.

## Langkah 2 — Masukkan Custom JS ke WPCode
1. Buat snippet baru: **Code Snippets → + Add Snippet → Add Your Custom Code (New Snippet)**.
2. Beri judul: `Rendang Mamaji - Global JS`.
3. Ubah **Code Type** menjadi **`JavaScript Snippet`**.
4. Copy-paste seluruh isi file `rendang-mamaji-global.js` (tanpa tag `<script>`).
5. Pada bagian **Insertion**:
   - **Insert Method**: `Auto Insert`
   - **Location**: `Site Wide Footer`
6. Aktifkan toggle **Active** lalu klik **Save Snippet**.

> JS ini sudah aman dipakai di **semua halaman** (header/footer di Theme Builder maupun landing page mana pun) karena mengecek keberadaan elemen terlebih dahulu sebelum menjalankan script.

## Langkah 3 — Tempel HTML Section ke Elementor
Di dalam folder `sections/`, terdapat 7 file HTML murni (sudah bebas `<style>`, `<link>`, dan `<script>`):
1. `sections/01-header-navbar.html`
2. `sections/02-hero-banner.html`
3. `sections/03-showcase-carousel.html`
4. `sections/04-split-kemasan-marquee.html`
5. `sections/05-keunggulan-craft.html`
6. `sections/06-kemitraan-lokasi.html`
7. `sections/07-footer.html`

Atur Container Elementor tiap section ke **Full Width**, **Padding: `0`**, **Gap: `0`**, lalu tempel isi HTML yang dibutuhkan ke widget **HTML**.
