/** @author ArifWicak - UI/UX Layout */
import React from 'react';

const TERMS = [
    {
        num: '01',
        color: 'bg-brutal-purple',
        title: 'Penerimaan Syarat',
        body: 'Dengan mengakses atau menggunakan platform Amikom Learning Hub, kamu menyatakan bahwa kamu telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat Layanan ini. Jika kamu tidak setuju dengan syarat ini, harap hentikan penggunaan layanan segera.'
    },
    {
        num: '02',
        color: 'bg-brutal-yellow',
        title: 'Eligibilitas Pengguna',
        body: 'Layanan ini ditujukan eksklusif untuk mahasiswa aktif, dosen, dan staf Universitas AMIKOM Yogyakarta. Kamu bertanggung jawab untuk memastikan bahwa NIM dan data akademik yang kamu daftarkan adalah valid dan milikmu sendiri.'
    },
    {
        num: '03',
        color: 'bg-brutal-pink',
        title: 'Penggunaan yang Diizinkan',
        body: 'Kamu diizinkan mengakses materi untuk keperluan belajar pribadi dan non-komersial. Berbagi akun, mengunduh massal konten berproteksi hak cipta, atau menggunakan platform untuk tujuan komersial tanpa izin tertulis dilarang keras.'
    },
    {
        num: '04',
        color: 'bg-emerald-400',
        title: 'Konten & Hak Cipta',
        body: 'Seluruh konten pada platform — termasuk video kuliah, RPS, artikel, dan kuis — dilindungi hak cipta dosen dan AMIKOM. Reproduksi, distribusi, atau modifikasi tanpa izin eksplisit merupakan pelanggaran hak cipta dan dapat dikenai sanksi akademik maupun hukum.'
    },
    {
        num: '05',
        color: 'bg-white',
        title: 'Kode Etik Pengguna',
        body: 'Pengguna wajib menjaga lingkungan belajar yang kondusif dan saling menghormati. Segala bentuk perundungan, ujaran kebencian, pelecehan, plagiarisme, atau aktivitas ilegal di platform akan mengakibatkan penangguhan akun secara permanen.'
    },
    {
        num: '06',
        color: 'bg-brutal-purple',
        title: 'Penghentian Layanan',
        body: 'Kami berhak menangguhkan atau menghentikan akses akun yang melanggar syarat ini tanpa pemberitahuan sebelumnya. Penghentian tidak menimbulkan kewajiban kompensasi kepada pengguna. Kamu dapat mengajukan banding melalui email resmi admin dalam 14 hari.'
    },
    {
        num: '07',
        color: 'bg-brutal-yellow',
        title: 'Batasan Tanggung Jawab',
        body: 'Platform disediakan "sebagaimana adanya" tanpa jaminan ketersediaan 100%. Kami tidak bertanggung jawab atas kerugian akibat gangguan layanan, kehilangan data, atau konten pihak ketiga. Kamu menggunakan layanan ini sepenuhnya atas risiko sendiri.'
    },
    {
        num: '08',
        color: 'bg-brutal-pink',
        title: 'Hukum yang Berlaku',
        body: 'Syarat Layanan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia. Setiap sengketa yang timbul akan diselesaikan melalui mediasi terlebih dahulu, dan apabila gagal, melalui Pengadilan Negeri Yogyakarta.'
    }
];

export default function SyaratLayananView({ onBack }: { onBack: () => void }) {
    return (
        <section className="max-w-4xl mx-auto flex flex-col gap-6">
            <button
                type="button"
                onClick={onBack}
                className="w-fit px-4 py-2 font-black text-xs uppercase bg-white border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
                ← Kembali
            </button>

            <div className="border-4 border-black bg-black text-white shadow-flat-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-black uppercase mb-2 text-gray-400">Amikom Hub · Legal</p>
                        <h1 className="text-4xl md:text-5xl font-black uppercase leading-none">
                            Syarat<br />Layanan
                        </h1>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-black uppercase text-gray-400">Versi</p>
                        <p className="text-2xl font-black text-brutal-yellow">2.1.0</p>
                        <p className="text-xs font-bold text-gray-400 mt-1">Update: 1 Jan 2026</p>
                    </div>
                </div>
            </div>

            <div className="border-4 border-black bg-brutal-yellow shadow-flat p-4 flex items-start gap-3">
                <span className="text-2xl shrink-0">⚠</span>
                <p className="text-sm font-black uppercase leading-snug">
                    Harap baca seluruh syarat ini dengan teliti sebelum menggunakan platform. Penggunaan layanan berarti kamu menyetujui semua ketentuan di bawah ini.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TERMS.map((term) => (
                    <div key={term.num} className="border-4 border-black shadow-flat overflow-hidden">
                        <div className={`${term.color} border-b-4 border-black p-4 flex items-center gap-3`}>
                            <span className="text-3xl font-black leading-none opacity-50">{term.num}</span>
                            <h2 className="text-sm font-black uppercase leading-tight">{term.title}</h2>
                        </div>
                        <div className="bg-white p-4">
                            <p className="text-xs font-bold leading-relaxed text-gray-700">{term.body}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-4 border-black bg-white shadow-flat p-5">
                <p className="text-xs font-bold text-gray-600 leading-relaxed">
                    Syarat Layanan ini terakhir diperbarui pada <span className="font-black text-black">1 Januari 2026</span>. Dengan terus menggunakan platform setelah tanggal tersebut, kamu menyetujui versi terbaru dari syarat ini. Untuk pertanyaan, hubungi{' '}
                    <span className="font-black text-black">legal@amikom.ac.id</span>.
                </p>
            </div>
        </section>
    );
}
