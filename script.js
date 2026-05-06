// Database Menu - Nama Biasa & Gambar Menarik
const dataMenu = [
    { id: 1, nama: "Nasi Goreng Biasa", harga: 15000, foto: "https://images.unsplash.com/photo-1512058560566-43346af0c44b?w=400" },
    { id: 2, nama: "Mie Goreng Telur", harga: 13000, foto: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400" },
    { id: 3, nama: "Ayam Goreng Lalapan", harga: 20000, foto: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400" },
    { id: 4, nama: "Es Teh Manis", harga: 5000, foto: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400" },
    { id: 5, nama: "Kopi Hitam Panas", harga: 8000, foto: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?w=400" },
    { id: 6, nama: "Es Jeruk Segar", harga: 7000, foto: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400" }
];

let keranjang = [];

// Fungsi Navigasi Halaman
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0,0);
}

// Menampilkan Menu di Olshop
function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = dataMenu.map(menu => `
        <div class="card">
            <img src="${menu.foto}" alt="${menu.nama}">
            <div class="card-body">
                <h3>${menu.nama}</h3>
                <span class="price">Rp ${menu.harga.toLocaleString('id-ID')}</span>
                <button class="btn-main" onclick="tambahItem(${menu.id})">Tambah</button>
            </div>
        </div>
    `).join('');
}

// Logika Keranjang
function tambahItem(id) {
    const item = dataMenu.find(m => m.id === id);
    keranjang.push(item);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = keranjang.length;
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    
    itemsEl.innerHTML = keranjang.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${item.nama}</span>
            <span>Rp ${item.harga.toLocaleString('id-ID')}</span>
        </div>
    `).join('');

    const total = keranjang.reduce((sum, item) => sum + item.harga, 0);
    totalEl.innerText = total.toLocaleString('id-ID');
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// Checkout WA ke nomor 085743473837
function checkoutWA() {
    if (keranjang.length === 0) return alert("Pilih menu dulu!");
    
    const nomorWA = "6285743473837";
    let pesan = "Halo Kedai Digital, saya mau pesan:\n\n";
    
    keranjang.forEach((item, index) => {
        pesan += `${index+1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}\n`;
    });
    
    const total = keranjang.reduce((sum, item) => sum + item.harga, 0);
    pesan += `\n*Total Akhir: Rp ${total.toLocaleString('id-ID')}*`;
    
    window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
}

// Inisialisasi
renderMenu();
