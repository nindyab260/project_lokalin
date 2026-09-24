import { useState, useEffect } from 'react';

function App() {
    // 1. Buat state (tempat penyimpanan) untuk data UMKM yang akan diambil
    const [umkmData, setUmkmData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Gunakan useEffect untuk mengambil data saat halaman pertama kali dimuat
    useEffect(() => {
        // URL Backend Anda
        fetch('http://localhost:8080/api/umkm')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Gagal mengambil data dari server');
                }
                return response.json(); // Mengubah response menjadi JSON
            })
            .then((data) => {
                setUmkmData(data); // Simpan data ke dalam state
                setLoading(false); // Matikan status loading
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []); // Array kosong [] artinya fungsi ini hanya dijalankan 1 kali di awal

    // 3. Tampilkan pesan loading atau error jika ada
    if (loading) return <div>Memuat data UMKM...</div>;
    if (error) return <div>Error: {error}</div>;

    // 4. Tampilkan datanya di layar
    return (
        <div style={{ padding: '20px' }}>
            <h1>Daftar UMKM Lokalin</h1>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {umkmData.map((umkm) => (
                    // Asumsi data umkm memiliki id, name, dan description
                    <div key={umkm.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                        <h3>{umkm.name}</h3>
                        <p>{umkm.description}</p>
                        {/* Anda bisa menambahkan info lain sesuai database Anda */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
