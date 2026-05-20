// ============================================
// DATA MASTER
// ============================================
const daftarRuangan = [
    "Aisyah 1", "Aisyah 2", "Nas 1", "Nas 2", "Hemodialisa", "Ponek", "Cnd", "Rds",
    "Cut Mutia", "Siti Khodijah", "Kartini", "Fatmawati 1", "Fatmawati 2", "Fisioterapi",
    "Edelwis", "Rajal", "Radiologi", "Lab", "Talasemia", "Picu", "Nicu", "Nad", "Icu",
    "Wk", "Igd", "Ruang OK"
];

const jenisLinen = [
    "Seprei", "Sarung Bantal", "Selimut", "Baju Dokter", "Celana",
    "Baju Pasien", "Baju Petugas", "Gown", "Perlak", "Seprei Bayi",
    "Tutup Inkubator", "Lain-lain"
];

// ============================================
// DATA STORAGE (LocalStorage)
// ============================================
class DataManager {
    constructor() {
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem('linenKotor')) {
            localStorage.setItem('linenKotor', JSON.stringify([]));
        }
        if (!localStorage.getItem('stokLinen')) {
            let stok = {};
            jenisLinen.forEach(jenis => {
                stok[jenis] = 0;
            });
            localStorage.setItem('stokLinen', JSON.stringify(stok));
        }
    }

    // Simpan Linen Kotor
    saveLinenKotor(data) {
        let linen = JSON.parse(localStorage.getItem('linenKotor')) || [];
        data.id = Date.now();
        data.createdAt = new Date().toISOString();
        linen.push(data);
        localStorage.setItem('linenKotor', JSON.stringify(linen));
        return data.id;
    }

    // Ambil semua Linen Kotor
    getAllLinenKotor() {
        return JSON.parse(localStorage.getItem('linenKotor')) || [];
    }

    // Hapus Linen Kotor
    deleteLinenKotor(id) {
        let linen = JSON.parse(localStorage.getItem('linenKotor')) || [];
        linen = linen.filter(item => item.id !== id);
        localStorage.setItem('linenKotor', JSON.stringify(linen));
    }

    // Update Stok Linen
    updateStokLinen(jenis, jumlah) {
        let stok = JSON.parse(localStorage.getItem('stokLinen')) || {};
        stok[jenis] = parseInt(jumlah);
        localStorage.setItem('stokLinen', JSON.stringify(stok));
    }

    // Ambil Stok Linen
    getStokLinen() {
        return JSON.parse(localStorage.getItem('stokLinen')) || {};
    }
}

const dataManager = new DataManager();

// ============================================
// INISIALISASI
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    populateDropdownRuangan();
    populateDropdownJenisLinen();
    generateInputLinen();
    setTodayDate();
    updateJam();
    updateTanggalFilter();
    loadStokTable();
    loadRiwayatTable();
    updateDashboard();
});

// Isi dropdown ruangan
function populateDropdownRuangan() {
    const select = document.getElementById('kotor-ruangan');
    daftarRuangan.forEach(ruang => {
        let opt = document.createElement('option');
        opt.value = ruang;
        opt.innerHTML = ruang;
        select.appendChild(opt);
    });
}

// Isi dropdown jenis linen
function populateDropdownJenisLinen() {
    const select = document.getElementById('stok-jenis');
    jenisLinen.forEach(jenis => {
        let opt = document.createElement('option');
        opt.value = jenis;
        opt.innerHTML = jenis;
        select.appendChild(opt);
    });
}

// Generate input dinamis untuk linen
function generateInputLinen() {
    const wrapper = document.getElementById('wrapper-item-linen');
    wrapper.innerHTML = '';
    jenisLinen.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "flex flex-col gap-1";
        div.innerHTML = `
            <label class="text-xs font-bold text-slate-600">${item.toUpperCase()}</label>
            <input type="number" min="0" value="0" name="linen_${index}" 
                   class="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-teal-500 outline-none">
        `;
        wrapper.appendChild(div);
    });
}

// Set tanggal hari ini
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('kotor-tanggal').value = today;
}

// Update tanggal dan jam realtime
function updateJam() {
    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('live-date').innerText = now.toLocaleDateString('id-ID', options);
        document.getElementById('live-clock').innerText = now.toLocaleTimeString('id-ID');
    }
    updateTime();
    setInterval(updateTime, 1000);
}

// Set tanggal filter ke hari ini
function updateTanggalFilter() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('filter-dari').value = today;
    document.getElementById('filter-sampai').value = today;
}

// ============================================
// FUNGSI SIMPAN LINEN KOTOR
// ============================================
function simpanLinenKotor(e) {
    e.preventDefault();

    const ruangan = document.getElementById('kotor-ruangan').value;
    const tanggal = document.getElementById('kotor-tanggal').value;
    const catatan = document.getElementById('kotor-catatan').value;

    if (!ruangan) {
        alert('❌ Pilih ruangan terlebih dahulu!');
        return;
    }

    // Kumpulkan data linen
    let linenData = {};
    let totalLinen = 0;
    jenisLinen.forEach((item, index) => {
        const input = document.querySelector(`input[name="linen_${index}"]`);
        const jumlah = parseInt(input.value) || 0;
        if (jumlah > 0) {
            linenData[item] = jumlah;
            totalLinen += jumlah;
        }
    });

    if (totalLinen === 0) {
        alert('❌ Masukkan minimal 1 jenis linen!');
        return;
    }

    // Simpan ke database
    const data = {
        ruangan: ruangan,
        tanggal: tanggal,
        linen: linenData,
        totalLinen: totalLinen,
        catatan: catatan
    };

    dataManager.saveLinenKotor(data);

    alert(`✅ Data linen dari ${ruangan} berhasil disimpan!\nTotal: ${totalLinen} item`);

    // Reset form
    document.getElementById('form-linen-kotor').reset();
    setTodayDate();
    generateInputLinen();
    updateDashboard();
    loadRiwayatTable();
}

// ============================================
// FUNGSI STOK LINEN
// ============================================
function simpanStokLinen(e) {
    e.preventDefault();

    const jenis = document.getElementById('stok-jenis').value;
    const jumlah = document.getElementById('stok-jumlah').value;

    if (!jenis) {
        alert('❌ Pilih jenis linen terlebih dahulu!');
        return;
    }

    dataManager.updateStokLinen(jenis, jumlah);
    alert(`✅ Stok ${jenis} berhasil diperbarui: ${jumlah} item`);

    document.getElementById('form-stok-linen').reset();
    loadStokTable();
    updateDashboard();
}

function loadStokTable() {
    const tbody = document.getElementById('tbody-stok');
    tbody.innerHTML = '';

    const stok = dataManager.getStokLinen();
    let no = 1;

    for (const [jenis, jumlah] of Object.entries(stok)) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${no++}</td>
            <td class="border border-gray-300 px-4 py-2">${jenis}</td>
            <td class="border border-gray-300 px-4 py-2 text-right font-semibold">${jumlah}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
                <button onclick="hapusStok('${jenis}')" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition">
                    🗑️ Hapus
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

function hapusStok(jenis) {
    if (confirm(`Hapus stok ${jenis}?`)) {
        dataManager.updateStokLinen(jenis, 0);
        loadStokTable();
        updateDashboard();
    }
}

// ============================================
// FUNGSI LAPORAN
// ============================================
function tampilkanLaporan() {
    const dari = document.getElementById('filter-dari').value;
    const sampai = document.getElementById('filter-sampai').value;

    let allData = dataManager.getAllLinenKotor();

    // Filter berdasarkan tanggal
    let filteredData = allData.filter(item => {
        return item.tanggal >= dari && item.tanggal <= sampai;
    });

    const tbody = document.getElementById('tbody-laporan');
    tbody.innerHTML = '';

    if (filteredData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="border border-gray-300 px-4 py-2 text-center text-gray-500">Tidak ada data</td></tr>';
        return;
    }

    let no = 1;
    filteredData.forEach(item => {
        const tr = document.createElement('tr');
        const tanggalObj = new Date(item.tanggal);
        const tanggalFormat = tanggalObj.toLocaleDateString('id-ID');

        tr.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${no++}</td>
            <td class="border border-gray-300 px-4 py-2">${tanggalFormat}</td>
            <td class="border border-gray-300 px-4 py-2">${item.ruangan}</td>
            <td class="border border-gray-300 px-4 py-2 text-right font-semibold">${item.totalLinen}</td>
            <td class="border border-gray-300 px-4 py-2 text-center">
                <button onclick="showDetail(${item.id})" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition">
                    👁️ Lihat
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ============================================
// FUNGSI RIWAYAT
// ============================================
function loadRiwayatTable() {
    const tbody = document.getElementById('tbody-riwayat');
    tbody.innerHTML = '';

    let allData = dataManager.getAllLinenKotor();
    allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    let no = 1;
    allData.forEach(item => {
        for (const [jenis, jumlah] of Object.entries(item.linen)) {
            const tr = document.createElement('tr');
            const tanggalObj = new Date(item.tanggal);
            const tanggalFormat = tanggalObj.toLocaleDateString('id-ID');

            tr.innerHTML = `
                <td class="border border-gray-300 px-4 py-2">${no++}</td>
                <td class="border border-gray-300 px-4 py-2">${tanggalFormat}</td>
                <td class="border border-gray-300 px-4 py-2">${item.ruangan}</td>
                <td class="border border-gray-300 px-4 py-2">${jenis}</td>
                <td class="border border-gray-300 px-4 py-2 text-right font-semibold">${jumlah}</td>
                <td class="border border-gray-300 px-4 py-2 text-center">
                    <button onclick="hapusRiwayat(${item.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition">
                        🗑️ Hapus
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        }
    });
}

function hapusRiwayat(id) {
    if (confirm('Hapus data ini dari riwayat?')) {
        dataManager.deleteLinenKotor(id);
        loadRiwayatTable();
        updateDashboard();
    }
}

// ============================================
// FUNGSI DASHBOARD
// ============================================
function updateDashboard() {
    let allData = dataManager.getAllLinenKotor();
    let stok = dataManager.getStokLinen();

    // Total linen kotor
    let totalKotor = 0;
    allData.forEach(item => {
        totalKotor += item.totalLinen;
    });

    // Total stok linen
    let totalStok = 0;
    for (const jumlah of Object.values(stok)) {
        totalStok += jumlah;
    }

    // Ruangan aktif (unik)
    let ruanganUnik = new Set();
    allData.forEach(item => {
        ruanganUnik.add(item.ruangan);
    });

    document.getElementById('total-kotor').innerText = totalKotor;
    document.getElementById('total-stok').innerText = totalStok;
    document.getElementById('ruangan-aktif').innerText = ruanganUnik.size;
}

// ============================================
// FUNGSI DETAIL & MODAL
// ============================================
function showDetail(id) {
    let allData = dataManager.getAllLinenKotor();
    let item = allData.find(x => x.id === id);

    if (!item) {
        alert('Data tidak ditemukan');
        return;
    }

    let detail = `
        <div class="space-y-3">
            <p><strong>Ruangan:</strong> ${item.ruangan}</p>
            <p><strong>Tanggal:</strong> ${new Date(item.tanggal).toLocaleDateString('id-ID')}</p>
            <p><strong>Total Linen:</strong> ${item.totalLinen}</p>
            <p><strong>Catatan:</strong> ${item.catatan || '-'}</p>
            <hr class="my-3">
            <p><strong>Detail Linen:</strong></p>
            <ul class="list-disc list-inside space-y-1">
    `;

    for (const [jenis, jumlah] of Object.entries(item.linen)) {
        detail += `<li>${jenis}: <strong>${jumlah}</strong></li>`;
    }

    detail += `
            </ul>
        </div>
    `;

    document.getElementById('modal-content').innerHTML = detail;
    document.getElementById('modal-detail').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal-detail').classList.add('hidden');
}

// Tutup modal jika klik di luar
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-detail');
    if (e.target === modal) {
        closeModal();
    }
});

// ============================================
// FUNGSI CETAK
// ============================================
function cetakLaporan() {
    const dari = document.getElementById('filter-dari').value;
    const sampai = document.getElementById('filter-sampai').value;
    let allData = dataManager.getAllLinenKotor();

    let filteredData = allData.filter(item => {
        return item.tanggal >= dari && item.tanggal <= sampai;
    });

    if (filteredData.length === 0) {
        alert('❌ Tidak ada data untuk dicetak!');
        return;
    }

    let html = `
        <html>
        <head>
            <title>Laporan Linen Binatu - RSUD SEKARWANGI</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { text-align: center; color: #0d9488; }
                .info { margin-bottom: 20px; font-size: 12px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #333; padding: 10px; text-align: left; }
                th { background-color: #0d9488; color: white; }
                tr:nth-child(even) { background-color: #f0f0f0; }
                .total { font-weight: bold; }
                .footer { margin-top: 30px; text-align: right; font-size: 12px; }
            </style>
        </head>
        <body>
            <h1>📋 Laporan Linen Binatu</h1>
            <p style="text-align: center; font-size: 14px;">RSUD SEKARWANGI</p>
            <div class="info">
                <p><strong>Periode:</strong> ${new Date(dari).toLocaleDateString('id-ID')} s/d ${new Date(sampai).toLocaleDateString('id-ID')}</p>
                <p><strong>Tanggal Cetak:</strong> ${new Date().toLocaleDateString('id-ID')}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>Ruangan</th>
                        <th>Total Linen</th>
                    </tr>
                </thead>
                <tbody>
    `;

    let no = 1;
    let grandTotal = 0;
    filteredData.forEach(item => {
        html += `
            <tr>
                <td>${no++}</td>
                <td>${new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                <td>${item.ruangan}</td>
                <td class="total">${item.totalLinen}</td>
            </tr>
        `;
        grandTotal += item.totalLinen;
    });

    html += `
                    <tr class="total">
                        <td colspan="3" style="text-align: right;">TOTAL:</td>
                        <td>${grandTotal}</td>
                    </tr>
                </tbody>
            </table>
            <div class="footer">
                <p>Dicetak oleh: Sistem Pelaporan Linen Binatu</p>
            </div>
        </body>
        </html>
    `;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
}

// ============================================
// NAVIGASI TAB
// ============================================
function switchTab(tabId) {
    // Sembunyikan semua tab
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    // Update button styling
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('bg-teal-50', 'text-teal-700', 'border-b-2', 'border-teal-700');
    });
    document.getElementById('btn-' + tabId).classList.add('bg-teal-50', 'text-teal-700', 'border-b-2', 'border-teal-700');

    // Update tabel jika perlu
    if (tabId === 'stok-linen') {
        loadStokTable();
    }
    if (tabId === 'laporan') {
        tampilkanLaporan();
    }
    if (tabId === 'riwayat') {
        loadRiwayatTable();
    }
}