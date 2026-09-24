import { useState, useEffect } from 'react';

const TestUMKM = () => {
    const [umkmData, setUmkmData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/umkm')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Gagal mengambil data dari server');
                }
                return response.json();
            })
            .then((data) => {
                setUmkmData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Memuat data UMKM...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Daftar UMKM Lokalin (Halaman Test API)</h1>

            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {umkmData.map((umkm: any) => (
                    <div key={umkm.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', minWidth: '200px' }}>
                        <h3>{umkm.name}</h3>
                        <p>{umkm.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestUMKM;
