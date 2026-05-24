/** @author ArifWicak - UI/UX Layout & Pras - Logic & Integration */
import React, { useMemo, useState } from 'react';
import type { Course, CourseModule } from '../types/course';

const TAB_OPTIONS = ['Ringkasan', 'Sumber Daya', 'Diskusi', 'Proyek'] as const;
type TabKey = (typeof TAB_OPTIONS)[number];

type CourseWithModules = Course & {
    course_name?: string;
    modules_raw?: string;
    code?: string;
};

const parseModules = (rawString: string) => {
    if (!rawString) return [];
    return rawString.split('|').map((item, index) => {
        const cleanedItem = item.trim();
        let status: CourseModule['status'] = 'TERKUNCI';
        if (cleanedItem.includes('- SELESAI')) status = 'SELESAI';
        if (cleanedItem.includes('- BERJALAN')) status = 'SEDANG BERJALAN';
        const displayTitle = cleanedItem
            .replace('- SELESAI', '')
            .replace('- BERJALAN', '')
            .replace('- TERKUNCI', '')
            .trim();
        return { id: index + 1, title: displayTitle, status: status };
    });
};

/**
 * Halaman detail kelas sesuai mockup.
 */
export default function CourseDetailView({
    course,
    isLoading,
    onBack
}: {
    course: CourseWithModules | null;
    isLoading: boolean;
    onBack: () => void;
}) {
    const [activeTab, setActiveTab] = useState<TabKey>('Ringkasan');
    const fallbackMateri = "Minggu 01: Pengantar & Kontrak Kuliah (45 Menit) - SELESAI | Minggu 02: Konsep Inti Kuliah Terkait (60 Menit) - BERJALAN | Minggu 03: Implementasi Kasus & Studi Literatur (90 Menit) - TERKUNCI | Minggu 04: Pendalaman Materi & Sesi Tanya Jawab (75 Menit) - TERKUNCI";
    const rawModules = ((course as CourseWithModules | null)?.modules_raw || fallbackMateri) as string;
    const parsedModules = useMemo(() => parseModules(rawModules), [rawModules]);
    const nowWatchingTitle = parsedModules[1]?.title ?? 'SISTEM DESAIN 101';

    const tabContent = useMemo(() => {
        if (activeTab === 'Ringkasan') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border-4 border-black shadow-flat p-4">
                        <h3 className="text-sm font-black uppercase mb-3">Yang Akan Kamu Pelajari</h3>
                        <ul className="text-xs font-bold flex flex-col gap-2">
                            <li>✔ Menyusun layout brutalist berkontras tinggi</li>
                            <li>✔ Memetakan RPS menjadi modul pembelajaran</li>
                            <li>✔ Membuat hierarki shadow yang tajam</li>
                            <li>✔ Menerapkan grid responsif modern</li>
                        </ul>
                    </div>
                    <div className="bg-brutal-pink border-4 border-black shadow-flat p-4">
                        <h3 className="text-sm font-black uppercase mb-3">Persyaratan Kelas</h3>
                        <ul className="text-xs font-bold flex flex-col gap-2">
                            <li>✔ Dasar React dan TypeScript</li>
                            <li>✔ Mengenal struktur RPS</li>
                            <li>✔ Siap eksplorasi visual yang tegas</li>
                            <li>✔ Dasar Git dan Docker</li>
                        </ul>
                    </div>
                </div>
            );
        }

        const contentMap: Record<TabKey, string[]> = {
            Ringkasan: [],
            'Sumber Daya': [
                'Slide kuliah resmi dan template RPS',
                'Checklist praktikum mingguan',
                'Referensi desain brutal internasional'
            ],
            Diskusi: [
                'Forum tanya jawab mingguan',
                'Sesi review tugas dengan mentor',
                'Ruang kolaborasi kelompok'
            ],
            Proyek: [
                'Brief proyek tengah semester',
                'Proyek akhir: dashboard brutal',
                'Rubrik penilaian dan deadline'
            ]
        };

        return (
            <div className="bg-white border-4 border-black shadow-flat p-4">
                <h3 className="text-sm font-black uppercase mb-3">{activeTab}</h3>
                <ul className="text-xs font-bold flex flex-col gap-2">
                    {contentMap[activeTab].map((item) => (
                        <li key={item}>• {item}</li>
                    ))}
                </ul>
            </div>
        );
    }, [activeTab]);

    if (isLoading) {
        return (
            <section className="border-4 border-black bg-white shadow-flat p-6">
                <div className="h-8 w-48 bg-neutral-300 border-2 border-black mb-4 animate-pulse"></div>
                <div className="h-64 bg-neutral-300 border-4 border-black animate-pulse"></div>
            </section>
        );
    }

    if (!course) {
        return (
            <section className="border-4 border-black bg-brutal-yellow shadow-flat p-6">
                <p className="font-black uppercase">Kelas tidak ditemukan. Silakan kembali ke katalog.</p>
                <button
                    type="button"
                    onClick={onBack}
                    className="mt-4 px-4 py-2 font-black text-xs uppercase bg-white border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                >
                    ← Kembali ke Katalog
                </button>
            </section>
        );
    }

    return (
        <section className="flex flex-col gap-6">
            <button
                type="button"
                onClick={onBack}
                className="w-fit px-4 py-2 font-black text-xs uppercase bg-white border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
                ← Kembali ke Katalog
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="relative w-full aspect-video bg-black border-4 border-black shadow-flat overflow-hidden">
                        <img
                            src={course.image}
                            alt={(course as CourseWithModules).course_name ?? course.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                        <button
                            type="button"
                            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-brutal-pink border-4 border-black shadow-flat flex items-center justify-center text-2xl font-black text-black hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                            aria-label="Putar pratinjau kelas"
                        >
                            ▶
                        </button>
                    </div>

                    <span className="inline-flex items-center gap-2 w-fit px-3 py-1 bg-brutal-yellow border-2 border-black text-xs font-black uppercase">
                        SEDANG MENONTON: MODUL 02 - {nowWatchingTitle}
                    </span>

                    <div className="flex flex-col gap-3">
                        <h2 className="text-3xl md:text-4xl font-black uppercase">
                            {(course as CourseWithModules).course_name ?? course.title}
                        </h2>
                        <p className="text-sm md:text-base font-bold text-gray-700">
                            {course.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-black uppercase">
                        <span className="px-3 py-2 border-2 border-black bg-white">Kode: {(course as CourseWithModules).code ?? '-'}</span>
                        <span className="px-3 py-2 border-2 border-black bg-white">Dosen: {course.instructor}</span>
                        <span className="px-3 py-2 border-2 border-black bg-brutal-pink">Mahasiswa: {course.students.toLocaleString('id-ID')}</span>
                        <span className="px-3 py-2 border-2 border-black bg-brutal-purple">Rating: {course.rating.toFixed(1)} ★</span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2 border-b-4 border-black pb-2">
                            {TAB_OPTIONS.map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-xs font-black uppercase border-2 border-black transition-all ${activeTab === tab ? 'bg-brutal-yellow shadow-flat' : 'bg-white'} hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        {tabContent}
                    </div>
                </div>

                <aside className="lg:col-span-1">
                    <div className="bg-brutal-purple border-4 border-black shadow-flat p-5 flex flex-col gap-4">
                        <h3 className="text-sm font-black uppercase text-black">
                            Modul Kuliah / Rencana Pembelajaran Semester (RPS)
                        </h3>
                        <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {parsedModules.length === 0 ? (
                                <div className="bg-white border-4 border-black shadow-flat p-4 text-xs font-black uppercase">
                                    Modul RPS belum tersedia.
                                </div>
                            ) : (
                                parsedModules.map((module, index) => (
                                    <div
                                        key={`${module.id}-${module.title}`}
                                        className={`bg-white border-4 border-black shadow-flat p-4 flex flex-col gap-2 ${index % 2 === 0 ? 'translate-x-1' : 'translate-x-0'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-black">{String(module.id).padStart(2, '0')}</span>
                                            <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-1">
                                                —
                                            </span>
                                        </div>
                                        <p className="text-xs font-black uppercase">
                                            {module.title}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {module.status === 'SELESAI' && (
                                                <span className="text-[10px] font-black uppercase bg-brutal-yellow border-2 border-black px-2 py-1">
                                                    Selesai
                                                </span>
                                            )}
                                            {module.status === 'SEDANG BERJALAN' && (
                                                <div className="flex items-center gap-2 w-full">
                                                    <span className="text-[10px] font-black uppercase bg-brutal-pink border-2 border-black px-2 py-1">
                                                        Sedang Berjalan
                                                    </span>
                                                    <div className="flex-1 h-2 border-2 border-black bg-white">
                                                        <div className="h-full w-2/3 bg-brutal-yellow"></div>
                                                    </div>
                                                </div>
                                            )}
                                            {module.status === 'TERKUNCI' && (
                                                <span className="text-[10px] font-black uppercase bg-gray-200 border-2 border-black px-2 py-1">
                                                    🔒 Terkunci
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <button
                            type="button"
                            className="w-full py-3 font-black text-xs uppercase bg-brutal-purple border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        >
                            Unduh RPS (PDF)
                        </button>
                    </div>
                </aside>
            </div>
        </section>
    );
}
