# AMIKOM HUB

> Platform agregasi materi kuliah berbasis RPS Informatika S1 Universitas AMIKOM Yogyakarta dengan gaya desain Neo-Brutalisme UI.

## Deskripsi Singkat
AMIKOM HUB adalah aplikasi web yang mengkurasi materi kuliah dan modul pembelajaran berdasarkan RPS. Proyek ini dibangun menggunakan React 19, Vite 6, Tailwind CSS v4, serta integrasi data riil dari Mockapi.io. Seluruh antarmuka mengikuti prinsip Neo-Brutalisme: border tebal, warna kontras, dan shadow tajam tanpa blur.

## Fitur Utama
- Integrasi data riil matakuliah Informatika AMIKOM via Axios dari Mockapi.io.
- Client-side pagination (maksimal 8 data per halaman).
- Penanganan state persistence menggunakan LocalStorage agar halaman detail tidak ter-reset saat di-refresh.

## Prasyarat Instalasi (Prerequisites)
> Pastikan semua kebutuhan ini tersedia di laptop masing-masing.

- Git lokal
- Docker Desktop dan Docker Compose aktif
- Node.js (opsional untuk verifikasi lokal, development utama di dalam container)

## Langkah Instalasi untuk Tim Kelompok
> Ikuti urutan berikut agar setup konsisten di semua anggota tim.

```bash
git clone <URL_REPO>
cd AMIKOM-HUB
docker compose up --build
```

Akses aplikasi di browser:

```text
http://localhost:5173
```

Mematikan container secara bersih:

```bash
docker compose down
```

## Kontribusi & Branching
> Panduan alur kerja tim agar rapi dan konsisten.

```text
main
└─ feature/<nama-fitur>
```

Langkah kontribusi singkat:

```bash
git checkout -b feature/nama-fitur
# kerjakan perubahan
git add .
git commit -m "feat: ringkasan perubahan"
git push -u origin feature/nama-fitur
```

> Setelah push, ajukan Pull Request ke branch main.

## Menjalankan Unit Test (Vitest)
> Digunakan untuk mengecek state dan LocalStorage.

```bash
npm test
```

Menjalankan test sekali (CI):

```bash
npm run test:run
```

## Troubleshooting Docker & HMR
> Catatan cepat jika terjadi masalah saat development.

- HMR tidak berjalan: pastikan Docker Desktop aktif dan gunakan `docker compose down` lalu `docker compose up --build`.
- Perubahan file tidak terbaca: pastikan volume mount berjalan dan coba hapus cache dengan `docker compose down -v`.
- Error modul: pastikan dependency terbaru, lalu rebuild image.
- Konflik port: pastikan port 5173 tidak dipakai aplikasi lain.

## Tentang Tim (DoaIbuDev)
> Informasi Kelompok - S1 Informatika AMIKOM Yogyakarta.

- Nama Anggota 1: Arif Wicaksono Komarudin (24.11.6072)
- Nama Anggota 2: Prasetyanto Tri Prabowo (24.11.6089)
- Nama Anggota 3: Fathan Nova Arroyan (24.11.6064)

---
