/** @author ArifWicak - UI/UX Layout */
import React, { useState } from 'react';

type Building = {
    id: string;
    code: string;
    name: string;
    color: string;
    textColor: string;
    x: number;
    y: number;
    w: number;
    h: number;
    desc: string;
    floors: number;
    facilities: string[];
};

const BUILDINGS: Building[] = [
    {
        id: 'a',
        code: 'GDA',
        name: 'Gedung Dekanat A',
        color: '#A78BFA',
        textColor: '#000',
        x: 8, y: 10, w: 18, h: 14,
        desc: 'Kantor Dekan, Administrasi Akademik, Ruang Rapat Utama.',
        floors: 5,
        facilities: ['Dekanat', 'BAA', 'Rapat Utama', 'ATM Center']
    },
    {
        id: 'b',
        code: 'GKI',
        name: 'Gedung Kuliah Informatika',
        color: '#FCD34D',
        textColor: '#000',
        x: 32, y: 10, w: 22, h: 14,
        desc: 'Kelas teori dan praktikum Prodi Informatika & Sistem Informasi.',
        floors: 6,
        facilities: ['Lab Komputer', 'Ruang Kelas', 'Smart Board', 'Loker']
    },
    {
        id: 'c',
        code: 'GLP',
        name: 'Gedung Lab Pemrograman',
        color: '#4ADE80',
        textColor: '#000',
        x: 60, y: 10, w: 18, h: 14,
        desc: 'Pusat praktikum pemrograman dengan workstation high-spec.',
        floors: 3,
        facilities: ['Lab Full-Stack', 'Lab AI/ML', 'Lab Jaringan', 'Server Room']
    },
    {
        id: 'd',
        code: 'PRP',
        name: 'Perpustakaan Pusat',
        color: '#F472B6',
        textColor: '#000',
        x: 8, y: 32, w: 14, h: 18,
        desc: 'Koleksi buku, jurnal digital, ruang baca, dan ruang diskusi.',
        floors: 4,
        facilities: ['Koleksi Buku', 'Jurnal Digital', 'Ruang Baca', 'Ruang Diskusi', 'Café Baca']
    },
    {
        id: 'e',
        code: 'AUD',
        name: 'Auditorium Utama',
        color: '#111111',
        textColor: '#fff',
        x: 28, y: 32, w: 28, h: 18,
        desc: 'Venue wisuda, seminar nasional, dan kegiatan kemahasiswaan besar.',
        floors: 2,
        facilities: ['Panggung Utama', 'Sound System', 'Backstage', 'AC Sentral', 'Kapasitas 2000']
    },
    {
        id: 'f',
        code: 'GKR',
        name: 'Gedung Kreativitas',
        color: '#A78BFA',
        textColor: '#000',
        x: 62, y: 32, w: 16, h: 18,
        desc: 'Studio desain, multimedia, dan ruang co-working mahasiswa.',
        floors: 3,
        facilities: ['Studio Desain', 'Studio Film', 'Co-Working', 'Lounge Kreatif']
    },
    {
        id: 'g',
        code: 'KNT',
        name: 'Kantin Mahasiswa',
        color: '#FCD34D',
        textColor: '#000',
        x: 8, y: 58, w: 20, h: 12,
        desc: 'Pusat makan mahasiswa dengan berbagai pilihan kuliner terjangkau.',
        floors: 1,
        facilities: ['20+ Stan Kuliner', 'Area Duduk', 'Mushola', 'Wastafel']
    },
    {
        id: 'h',
        code: 'SPT',
        name: 'Lapangan & Sport Center',
        color: '#4ADE80',
        textColor: '#000',
        x: 34, y: 58, w: 24, h: 12,
        desc: 'Fasilitas olahraga lengkap: futsal, basket, bulu tangkis, dan gym.',
        floors: 1,
        facilities: ['Lapangan Futsal', 'Lapangan Basket', 'Badminton', 'Gym', 'Jogging Track']
    },
    {
        id: 'i',
        code: 'PKM',
        name: 'Poli Klinik & Konseling',
        color: '#F472B6',
        textColor: '#000',
        x: 64, y: 58, w: 14, h: 12,
        desc: 'Layanan kesehatan dan konseling psikologis untuk mahasiswa.',
        floors: 2,
        facilities: ['Dokter Umum', 'Psikolog', 'Apotek', 'Ruang Tunggu']
    }
];

const LEGEND = [
    { color: '#A78BFA', label: 'Akademik' },
    { color: '#FCD34D', label: 'Perkuliahan' },
    { color: '#4ADE80', label: 'Lab & Fasilitas' },
    { color: '#F472B6', label: 'Layanan' },
    { color: '#111111', label: 'Auditorium' }
];

export default function PetaKampusView({ onBack }: { onBack: () => void }) {
    const [selected, setSelected] = useState<Building | null>(null);

    return (
        <section className="max-w-5xl mx-auto flex flex-col gap-6">
            <button
                type="button"
                onClick={onBack}
                className="w-fit px-4 py-2 font-black text-xs uppercase bg-white border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
                ← Kembali
            </button>

            <div className="border-4 border-black bg-brutal-purple shadow-flat-lg p-6 md:p-8">
                <p className="text-xs font-black uppercase mb-2 opacity-70">Amikom Hub · Kampus</p>
                <h1 className="text-4xl md:text-5xl font-black uppercase leading-none">Peta Kampus</h1>
                <p className="text-sm font-bold mt-2 opacity-80">Universitas AMIKOM Yogyakarta — Jl. Ring Road Utara, Condongcatur</p>
            </div>

            <div className="border-4 border-black bg-white shadow-flat-lg p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                    {LEGEND.map((l) => (
                        <span key={l.label} className="flex items-center gap-2 text-xs font-black uppercase border-2 border-black px-2 py-1">
                            <span className="w-3 h-3 border-2 border-black inline-block" style={{ background: l.color }} />
                            {l.label}
                        </span>
                    ))}
                </div>

                <div className="relative border-4 border-black bg-neutral-100 overflow-hidden" style={{ paddingBottom: '60%' }}>
                    <svg
                        viewBox="0 0 100 80"
                        className="absolute inset-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Grid lines */}
                        {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => (
                            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={80} stroke="#ccc" strokeWidth="0.2" />
                        ))}
                        {[10, 20, 30, 40, 50, 60, 70].map(y => (
                            <line key={`h${y}`} x1={0} y1={y} x2={100} y2={y} stroke="#ccc" strokeWidth="0.2" />
                        ))}

                        {/* Roads */}
                        <rect x={0} y={26} width={100} height={4} fill="#888" />
                        <rect x={0} y={52} width={100} height={4} fill="#888" />
                        <rect x={26} y={0} width={4} height={80} fill="#888" />
                        <rect x={58} y={0} width={4} height={80} fill="#888" />
                        <text x={50} y={29.5} textAnchor="middle" fontSize="2" fill="white" fontWeight="bold">JALAN UTAMA KAMPUS A</text>
                        <text x={50} y={55.5} textAnchor="middle" fontSize="2" fill="white" fontWeight="bold">JALAN UTAMA KAMPUS B</text>

                        {/* Parkir */}
                        <rect x={84} y={10} width={10} height={10} fill="#d1d5db" stroke="#000" strokeWidth="0.5" />
                        <text x={89} y={15.5} textAnchor="middle" fontSize="2.5" fill="#000" fontWeight="bold">P</text>
                        <rect x={84} y={32} width={10} height={14} fill="#d1d5db" stroke="#000" strokeWidth="0.5" />
                        <text x={89} y={39.5} textAnchor="middle" fontSize="2.5" fill="#000" fontWeight="bold">P</text>

                        {/* Buildings */}
                        {BUILDINGS.map((b) => (
                            <g key={b.id} onClick={() => setSelected(b)} style={{ cursor: 'pointer' }}>
                                <rect
                                    x={b.x} y={b.y} width={b.w} height={b.h}
                                    fill={b.color}
                                    stroke={selected?.id === b.id ? '#ff0000' : '#000'}
                                    strokeWidth={selected?.id === b.id ? 1 : 0.5}
                                />
                                <text x={b.x + b.w / 2} y={b.y + b.h / 2 - 1} textAnchor="middle" fontSize="2.5" fill={b.textColor} fontWeight="bold">
                                    {b.code}
                                </text>
                                <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 2.5} textAnchor="middle" fontSize="1.8" fill={b.textColor} opacity="0.8">
                                    {b.floors}Lt
                                </text>
                            </g>
                        ))}

                        {/* Compass */}
                        <text x={95} y={6} textAnchor="middle" fontSize="4" fill="#000" fontWeight="900">N</text>
                        <text x={95} y={7.5} textAnchor="middle" fontSize="2" fill="#000">↑</text>
                    </svg>
                </div>

                <p className="text-xs font-bold text-gray-500 mt-2 text-center">Klik gedung untuk melihat detail fasilitas</p>
            </div>

            {selected ? (
                <div className="border-4 border-black shadow-flat-lg overflow-hidden">
                    <div className="p-4 border-b-4 border-black flex items-center justify-between" style={{ background: selected.color }}>
                        <div>
                            <p className="text-xs font-black uppercase opacity-70">Kode: {selected.code}</p>
                            <h2 className="text-xl font-black uppercase" style={{ color: selected.textColor }}>
                                {selected.name}
                            </h2>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-black uppercase" style={{ color: selected.textColor, opacity: 0.7 }}>Jumlah Lantai</p>
                            <p className="text-3xl font-black" style={{ color: selected.textColor }}>{selected.floors}</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-black uppercase mb-2">Deskripsi</p>
                            <p className="text-sm font-bold text-gray-700">{selected.desc}</p>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase mb-2">Fasilitas</p>
                            <div className="flex flex-wrap gap-2">
                                {selected.facilities.map((f) => (
                                    <span key={f} className="px-2 py-1 text-xs font-black border-2 border-black bg-neutral-100 uppercase">
                                        {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border-4 border-black bg-brutal-yellow shadow-flat p-5 text-center">
                    <p className="font-black uppercase text-sm">← Pilih gedung pada peta untuk melihat detail fasilitas</p>
                </div>
            )}

            <div className="border-4 border-black bg-white shadow-flat p-4">
                <p className="text-xs font-black uppercase mb-3">Daftar Gedung</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {BUILDINGS.map((b) => (
                        <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelected(b)}
                            className={`flex items-center gap-3 p-3 border-2 border-black text-left transition-all hover:-translate-y-0.5 hover:shadow-flat ${selected?.id === b.id ? 'shadow-flat' : ''}`}
                            style={{ background: selected?.id === b.id ? b.color : '#fff' }}
                        >
                            <span className="text-xs font-black uppercase px-2 py-1 border-2 border-black" style={{ background: b.color, minWidth: '3rem', textAlign: 'center' }}>
                                {b.code}
                            </span>
                            <span className="text-xs font-bold leading-tight">{b.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
