/** @author ArifWicak - UI/UX Layout */
import React, { useState } from 'react';

const SECTIONS = [
    {
        id: 'pengumpulan',
        title: '01. Data Yang Kami Kumpulkan',
        color: 'bg-brutal-yellow',
        content: [
            'Informasi akun: nama lengkap, NIM, program studi, angkatan, kelas, dan alamat email yang kamu daftarkan.',
            'Data penggunaan: kelas yang diakses, kemajuan modul, durasi belajar, dan interaksi dalam forum.',
            'Informasi teknis: alamat IP, jenis perangkat, browser, dan sistem operasi untuk keperluan diagnostik.',
            'Cookies dan penyimpanan lokal untuk menjaga sesi login dan preferensi tampilan.'
        ]
    },
    {
        id: 'penggunaan',
        title: '02. Cara Kami Menggunakan Data',
        color: 'bg-brutal-purple',
        content: [
            'Personalisasi pengalaman belajar berdasarkan mata kuliah yang kamu ikuti dan kemajuan akademikmu.',
            'Komunikasi penting terkait pembaruan platform, jadwal kelas, dan pengumuman dari dosen.',
            'Analisis agregat untuk meningkatkan kualitas konten dan fitur platform tanpa mengidentifikasi individu.',
            'Pemenuhan kewajiban akademik kepada Universitas AMIKOM Yogyakarta sebagai institusi penyelenggara.'
        ]
    },
    {
        id: 'perlindungan',
        title: '03. Perlindungan Data Kamu',
        color: 'bg-brutal-pink',
        content: [
            'Enkripsi TLS/SSL untuk semua transmisi data antara perangkatmu dan server kami.',
            'Penyimpanan password menggunakan hashing bcrypt — kami tidak pernah menyimpan password dalam bentuk teks.',
            'Akses data dibatasi hanya untuk personel yang memiliki otorisasi dan keperluan yang sah.',
            'Audit keamanan berkala dan pemantauan sistem untuk mendeteksi akses tidak sah.'
        ]
    },
    {
        id: 'hak',
        title: '04. Hak-Hak Kamu',
        color: 'bg-white',
        content: [
            'Hak akses: kamu berhak meminta salinan data pribadi yang kami simpan kapan saja.',
            'Hak koreksi: kamu bisa memperbarui atau mengoreksi data yang tidak akurat melalui halaman profil.',
            'Hak hapus: kamu bisa meminta penghapusan akun dan seluruh data terkait dengan menghubungi admin.',
            'Hak portabilitas: kami akan menyediakan data kamu dalam format yang dapat dibaca mesin jika diminta.'
        ]
    },
    {
        id: 'pihak-ketiga',
        title: '05. Berbagi Dengan Pihak Ketiga',
        color: 'bg-emerald-400',
        content: [
            'Kami tidak menjual, menyewakan, atau memperdagangkan data pribadimu kepada pihak ketiga manapun.',
            'Data dapat dibagikan kepada dosen dan staf akademik AMIKOM sesuai kebutuhan administrasi perkuliahan.',
            'Penyedia layanan teknis terpercaya (hosting, analytics) terikat perjanjian kerahasiaan data yang ketat.',
            'Pengungkapan kepada otoritas hukum hanya dilakukan jika diwajibkan oleh peraturan perundangan yang berlaku.'
        ]
    },
    {
        id: 'perubahan',
        title: '06. Perubahan Kebijakan',
        color: 'bg-brutal-yellow',
        content: [
            'Kami berhak memperbarui kebijakan privasi ini sewaktu-waktu sesuai perkembangan platform dan regulasi.',
            'Perubahan signifikan akan diberitahukan melalui email dan notifikasi di dalam platform minimal 7 hari sebelumnya.',
            'Penggunaan layanan setelah tanggal efektif perubahan dianggap sebagai persetujuan terhadap kebijakan baru.',
            'Versi sebelumnya dari kebijakan ini tersimpan dan dapat diminta melalui email admin.'
        ]
    }
];

export default function KebijakanPrivasiView({ onBack }: { onBack: () => void }) {
    const [openSection, setOpenSection] = useState<string | null>('pengumpulan');

    return (
        <section className="max-w-4xl mx-auto flex flex-col gap-6">
            <button
                type="button"
                onClick={onBack}
                className="w-fit px-4 py-2 font-black text-xs uppercase bg-white border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
                ← Kembali
            </button>

            <div className="border-4 border-black bg-brutal-yellow shadow-flat-lg p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-black uppercase mb-2 opacity-70">Amikom Hub · Legal</p>
                        <h1 className="text-4xl md:text-5xl font-black uppercase leading-none">
                            Kebijakan<br />Privasi
                        </h1>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-black uppercase">Berlaku sejak</p>
                        <p className="text-2xl font-black">1 Jan 2026</p>
                    </div>
                </div>
            </div>

            <div className="border-4 border-black bg-white shadow-flat p-5">
                <p className="font-bold text-sm leading-relaxed text-gray-700">
                    Kebijakan Privasi ini menjelaskan bagaimana <span className="font-black text-black">Amikom Learning Hub</span> mengumpulkan, menggunakan, dan melindungi informasi pribadi yang kamu berikan saat menggunakan platform kami. Dengan menggunakan layanan kami, kamu menyetujui praktik yang dijelaskan dalam dokumen ini.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                {SECTIONS.map((section) => {
                    const isOpen = openSection === section.id;
                    return (
                        <div key={section.id} className="border-4 border-black shadow-flat overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setOpenSection(isOpen ? null : section.id)}
                                className={`w-full flex items-center justify-between p-4 font-black text-sm uppercase text-left transition-all ${section.color} hover:opacity-90`}
                            >
                                <span>{section.title}</span>
                                <span className="text-2xl leading-none ml-4">{isOpen ? '−' : '+'}</span>
                            </button>
                            {isOpen && (
                                <div className="bg-white border-t-4 border-black p-5">
                                    <ul className="flex flex-col gap-3">
                                        {section.content.map((item, i) => (
                                            <li key={i} className="flex gap-3 items-start text-sm font-bold text-gray-700">
                                                <span className="font-black text-black mt-0.5 shrink-0">→</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="border-4 border-black bg-black text-white shadow-flat p-5">
                <p className="text-xs font-bold leading-relaxed">
                    <span className="font-black">Pertanyaan?</span> Hubungi kami di{' '}
                    <span className="text-brutal-yellow font-black">privacy@amikom.ac.id</span>{' '}
                    atau kunjungi Pusat Bantuan. Kami berkomitmen untuk merespons dalam 2 hari kerja.
                </p>
            </div>
        </section>
    );
}
