# 📋 Aplikasi Pelaporan Linen Binatu RSUD SEKARWANGI

Aplikasi web untuk mengelola pelaporan linen binatu di RSUD SEKARWANGI dengan fitur-fitur lengkap.

## 🎯 Fitur Utama

### 1. 📥 Input Linen Kotor
- Pilih ruangan dari 26 ruangan yang tersedia
- Input jumlah setiap jenis linen (12 jenis)
- Tambahkan catatan
- Simpan otomatis ke database lokal

### 2. 📦 Manajemen Stok Linen
- Tambah/update stok untuk setiap jenis linen
- Lihat daftar lengkap stok
- Hapus stok jika diperlukan

### 3. 📊 Laporan
- Filter laporan berdasarkan tanggal
- Lihat ringkasan dalam bentuk kartu statistik
- Lihat detail setiap pelaporan
- Cetak laporan dalam format PDF

### 4. 📝 Riwayat
- Lihat semua pelaporan yang telah dibuat
- Hapus data riwayat jika diperlukan
- Data diurutkan berdasarkan tanggal terbaru

## 📍 Ruangan yang Didukung

```
1. Aisyah 1
2. Aisyah 2
3. Nas 1
4. Nas 2
5. Hemodialisa
6. Ponek
7. Cnd
8. Rds
9. Cut Mutia
10. Siti Khodijah
11. Kartini
12. Fatmawati 1
13. Fatmawati 2
14. Fisioterapi
15. Edelwis
16. Rajal
17. Radiologi
18. Lab
19. Talasemia
20. Picu
21. Nicu
22. Nad
23. Icu
24. Wk
25. Igd
26. Ruang OK
```

## 👔 Jenis Linen

```
1. Seprei
2. Sarung Bantal
3. Selimut
4. Baju Dokter
5. Celana
6. Baju Pasien
7. Baju Petugas
8. Gown
9. Perlak
10. Seprei Bayi
11. Tutup Inkubator
12. Lain-lain
```

## 💾 Penyimpanan Data

Aplikasi menggunakan **LocalStorage** browser untuk menyimpan data:
- Data linen kotor disimpan dalam array
- Stok linen disimpan dalam objek
- Setiap entri memiliki timestamp unik

## 🚀 Cara Penggunaan

### 1. Buka Aplikasi
```bash
Buka file index.html di browser
```

### 2. Input Linen Kotor
1. Klik tab "Input Linen Kotor"
2. Pilih ruangan dari dropdown
3. Pilih tanggal pelaporan
4. Masukkan jumlah setiap jenis linen
5. Tambahkan catatan (opsional)
6. Klik tombol "Simpan"

### 3. Manajemen Stok
1. Klik tab "Stok Linen"
2. Pilih jenis linen
3. Masukkan jumlah stok
4. Klik "Tambah/Update Stok"

### 4. Lihat Laporan
1. Klik tab "Laporan"
2. Pilih rentang tanggal
3. Klik "Filter" untuk menampilkan laporan
4. Klik "Cetak" untuk print laporan

### 5. Lihat Riwayat
1. Klik tab "Riwayat"
2. Lihat semua pelaporan yang telah dibuat

## �� Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **Tailwind CSS** - Styling responsive
- **Vanilla JavaScript** - Logika aplikasi
- **LocalStorage API** - Penyimpanan data lokal

## 📱 Responsive Design

Aplikasi dirancang responsive untuk:
- Desktop
- Tablet
- Mobile

## 🔐 Keamanan Data

- Data disimpan lokal di browser (tidak ada server)
- Setiap data memiliki ID unik berdasarkan timestamp
- User dapat menghapus data kapan saja

## 📈 Dashboard

Dashboard menampilkan:
- Total Linen Kotor (dari semua pelaporan)
- Total Stok Linen (dari semua jenis)
- Jumlah Ruangan Aktif (yang telah membuat pelaporan)

## 🖨️ Cetak Laporan

Laporan dapat dicetak dalam format:
- PDF melalui browser print dialog
- Tabel rapi dengan totalisasi
- Periode laporan yang jelas

## ✨ Fitur Tambahan

- ⏰ Jam dan tanggal real-time
- 🎨 UI modern dengan gradient dan shadow
- 📱 Mobile-friendly design
- ⌨️ Keyboard shortcuts support
- ✔️ Input validation
- 📊 Data visualization

## 🔄 Update Data

Untuk update/mengedit data:
1. Hapus data lama dari riwayat
2. Input data baru dengan nilai yang benar

## ⚠️ Catatan Penting

- Data disimpan di LocalStorage browser, bukan database server
- Menghapus cache browser akan menghapus semua data
- Gunakan browser yang sama untuk konsistensi data
- Backup data secara berkala jika perlu

## 📞 Support

Jika ada pertanyaan atau saran, silakan buat issue di repository ini.

---

**Dibuat untuk RSUD SEKARWANGI**

*Versi 1.0 - 2024*