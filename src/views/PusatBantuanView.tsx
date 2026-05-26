/** @author ArifWicak - UI/UX Layout */
import React, { useState } from 'react';

type FaqItem = { q: string; a: string };
type Category = {
    id: string;
    icon: string;
    title: string;
    color: string;
    faqs: FaqItem[];
};

const CATEGORIES: Category[] = [
    {
        id: 'akun',
        icon: '👤',
        title: 'Akun & Login',
        color: 'bg-brutal-purple',
        faqs: [
            { q: 'Bagaimana cara mendaftar akun?', a: 'Klik tombol "Daftar" di navbar, isi formulir dengan NIM, nama lengkap, prodi, angkatan, kelas, dan email AMIKOM-mu, lalu klik "Daftar". Kamu juga bisa daftar cepat menggunakan Google.' },
            { q: 'Lupa password, apa yang harus dilakukan?', a: 'Klik "Masuk" lalu pilih "Lupa Password". Masukkan email terdaftarmu, kami akan mengirim tautan reset password ke email tersebut dalam 5 menit.' },
            { q: 'Apakah satu NIM bisa mendaftar lebih dari satu akun?', a: 'Tidak. Satu NIM hanya bisa terdaftar pada satu akun. Jika mengalami masalah duplikasi, hubungi admin melalui email support.' },
            { q: 'Bagaimana cara mengubah data profil?', a: 'Masuk ke akun, klik menu "Profil" di navbar. Dari halaman profil kamu bisa memperbarui nama, email, dan data akademik. Perubahan NIM memerlukan verifikasi admin.' }
        ]
    },
    {
        id: 'kelas',
        icon: '📚',
        title: 'Kelas & Materi',
        color: 'bg-brutal-yellow',
        faqs: [
            { q: 'Bagaimana cara mencari kelas mata kuliah tertentu?', a: 'Gunakan kotak pencarian di halaman Eksplorasi. Ketik nama mata kuliah, nama dosen, atau topik. Kamu juga bisa filter berdasarkan tipe konten: VIDEO, ARTIKEL, RPS, atau KUIS.' },
            { q: 'Kenapa beberapa modul masih terkunci?', a: 'Modul terkunci karena belum dibuka oleh dosen pengampu atau kamu belum menyelesaikan modul prasyaratnya. Ikuti urutan modul yang tersedia dan modul berikutnya akan terbuka secara otomatis.' },
            { q: 'Apakah materi bisa diakses offline?', a: 'Saat ini platform hanya mendukung akses online. Namun kamu bisa mengunduh RPS dalam format PDF dari halaman detail kelas menggunakan tombol "Unduh RPS (PDF)".' },
            { q: 'Bagaimana cara melaporkan konten yang salah atau rusak?', a: 'Scroll ke bawah halaman kelas dan klik "Laporkan Masalah", atau kirim email ke support@amikom.ac.id dengan menyertakan nama kelas dan deskripsi masalahnya.' }
        ]
    },
    {
        id: 'teknis',
        icon: '🔧',
        title: 'Masalah Teknis',
        color: 'bg-brutal-pink',
        faqs: [
            { q: 'Video tidak bisa diputar, apa solusinya?', a: 'Pastikan koneksi internet stabil. Coba refresh halaman atau bersihkan cache browser. Jika masih bermasalah, coba gunakan browser lain (Chrome/Firefox terbaru) atau nonaktifkan ekstensi pemblokir iklan.' },
            { q: 'Halaman loading sangat lambat.', a: 'Periksa kecepatan internet. Platform ini dioptimalkan untuk koneksi minimal 5 Mbps. Jika menggunakan WiFi kampus, pastikan kamu terhubung ke jaringan yang benar (AMIKOM-EDU, bukan AMIKOM-GUEST).' },
            { q: 'Kemajuan belajar saya tidak tersimpan.', a: 'Pastikan kamu login sebelum memulai modul. Progress hanya tersimpan untuk pengguna yang sudah login. Jika sudah login tapi masih bermasalah, coba logout dan login kembali.' },
            { q: 'Browser apa yang paling kompatibel?', a: 'Platform ini dioptimalkan untuk Chrome v100+, Firefox v100+, Edge v100+, dan Safari v15+. Hindari menggunakan Internet Explorer karena tidak didukung sama sekali.' }
        ]
    },
    {
        id: 'lainnya',
        icon: '💬',
        title: 'Lainnya',
        color: 'bg-emerald-400',
        faqs: [
            { q: 'Bagaimana cara berpartisipasi di forum diskusi?', a: 'Buka halaman detail kelas dan klik tab "Diskusi". Kamu bisa membuat pertanyaan baru atau membalas diskusi yang sudah ada. Login diperlukan untuk berpartisipasi.' },
            { q: 'Apakah ada aplikasi mobile Amikom Hub?', a: 'Saat ini platform hanya tersedia dalam versi web yang responsif dan bisa diakses dari browser mobile. Aplikasi Android dan iOS sedang dalam tahap pengembangan.' },
            { q: 'Bagaimana cara menghubungi dosen melalui platform?', a: 'Gunakan fitur "Forum" di halaman detail kelas untuk bertanya langsung kepada dosen. Dosen akan merespons dalam jam kerja (Senin–Jumat, 08.00–16.00 WIB).' },
            { q: 'Bagaimana cara menghapus akun?', a: 'Kirim permintaan penghapusan akun ke privacy@amikom.ac.id menggunakan email terdaftarmu. Sertakan NIM dan alasan penghapusan. Proses membutuhkan 7 hari kerja.' }
        ]
    }
];

const CONTACTS = [
    { icon: '📧', label: 'Email Support', value: 'support@amikom.ac.id', sub: 'Respons dalam 1×24 jam' },
    { icon: '📞', label: 'Hotline Kampus', value: '(0274) 884 201', sub: 'Senin–Jumat, 08.00–16.00' },
    { icon: '💬', label: 'Live Chat', value: 'Tersedia di Platform', sub: 'Jam 09.00–17.00 WIB' },
    { icon: '📍', label: 'Kunjungi Kami', value: 'Gedung Dekanat Lt. 2', sub: 'Ruang Helpdesk TI' }
];

export default function PusatBantuanView({ onBack }: { onBack: () => void }) {
    const [activeCategory, setActiveCategory] = useState<string>('akun');
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const currentCategory = CATEGORIES.find((c) => c.id === activeCategory)!;

    return (
        <section className="max-w-5xl mx-auto flex flex-col gap-6">
            <button
                type="button"
                onClick={onBack}
                className="w-fit px-4 py-2 font-black text-xs uppercase bg-white border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
                ← Kembali
            </button>

            <div className="border-4 border-black bg-emerald-400 shadow-flat-lg p-6 md:p-8">
                <p className="text-xs font-black uppercase mb-2 opacity-70">Amikom Hub · Support</p>
                <h1 className="text-4xl md:text-5xl font-black uppercase leading-none">Pusat Bantuan</h1>
                <p className="text-sm font-bold mt-2 opacity-80">Temukan jawaban cepat atau hubungi tim support kami</p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CONTACTS.map((c) => (
                    <div key={c.label} className="border-4 border-black bg-white shadow-flat p-4 flex flex-col gap-1">
                        <span className="text-2xl">{c.icon}</span>
                        <p className="text-xs font-black uppercase mt-1">{c.label}</p>
                        <p className="text-xs font-black text-black">{c.value}</p>
                        <p className="text-[10px] font-bold text-gray-500">{c.sub}</p>
                    </div>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="border-4 border-black shadow-flat overflow-hidden">
                <div className="border-b-4 border-black p-4 bg-black">
                    <h2 className="text-sm font-black uppercase text-white">Pertanyaan yang Sering Diajukan (FAQ)</h2>
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Category Sidebar */}
                    <div className="md:w-56 border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-row md:flex-col overflow-x-auto md:overflow-visible">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => { setActiveCategory(cat.id); setOpenFaq(0); }}
                                className={`flex items-center gap-2 p-3 font-black text-xs uppercase border-b-2 md:border-b-4 border-black whitespace-nowrap text-left transition-all ${activeCategory === cat.id ? cat.color : 'bg-white hover:bg-neutral-100'}`}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="flex-1 bg-white">
                        {currentCategory.faqs.map((faq, i) => (
                            <div key={i} className="border-b-4 border-black last:border-b-0">
                                <button
                                    type="button"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-4 font-black text-xs uppercase text-left hover:bg-neutral-50 transition-colors gap-4"
                                >
                                    <span className="leading-snug">{faq.q}</span>
                                    <span className="text-2xl leading-none shrink-0">{openFaq === i ? '−' : '+'}</span>
                                </button>
                                {openFaq === i && (
                                    <div className="px-4 pb-5 border-t-2 border-black bg-neutral-50">
                                        <p className="text-sm font-bold text-gray-700 leading-relaxed pt-4">
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Still need help */}
            <div className="border-4 border-black bg-brutal-purple shadow-flat p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <p className="font-black uppercase text-lg leading-none">Masih Butuh Bantuan?</p>
                    <p className="text-sm font-bold mt-1 opacity-80">Tim support kami siap membantu kamu secara langsung.</p>
                </div>
                <a
                    href="mailto:support@amikom.ac.id"
                    className="px-6 py-3 font-black text-sm uppercase bg-black text-white border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all whitespace-nowrap"
                >
                    Hubungi Support →
                </a>
            </div>
        </section>
    );
}
