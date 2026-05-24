/** @author Agent 1 - UI/UX Layout & Agent 2 - Logic & Integration */
import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { Course } from '../types/course';

const FILTER_OPTIONS = ['ALL', 'VIDEO', 'ARTIKEL', 'RPS', 'KUIS'] as const;

/**
 * Halaman katalog utama: hero, pencarian, filter, dan grid kartu.
 */
export default function CatalogView({
    courses,
    loading,
    onSelectCourse
}: {
    courses: Course[];
    loading: boolean;
    onSelectCourse: (course: Course) => void;
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<(typeof FILTER_OPTIONS)[number]>('ALL');

    /** @author Agent 2 - Logic & Integration */
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesBadge = selectedFilter === 'ALL' || course.badgeType === selectedFilter;
            return matchesSearch && matchesBadge;
        });
    }, [courses, searchQuery, selectedFilter]);

    return (
        <section>
            <section className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
                <h2 className="text-5xl md:text-6xl font-black tracking-tight uppercase mb-4 leading-none">
                    BELAJAR APA SAJA
                </h2>
                <p className="text-gray-700 font-bold max-w-lg text-sm md:text-base mb-8 leading-snug">
                    Platform akademik yang tegas untuk mahasiswa AMIKOM. Kuasai skill baru lewat modul yang kontras dan berani.
                </p>

                <div className="w-full bg-white border-4 border-black p-6 shadow-flat-lg">
                    <form className="relative flex items-center mb-4" onSubmit={(e) => e.preventDefault()}>
                        <Search className="absolute left-4 text-gray-500 w-5 h-5 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari mata kuliah, dosen, atau topik..."
                            className="w-full pl-12 pr-4 py-3.5 bg-neutral-100 border-4 border-black font-bold text-black focus:outline-none"
                        />
                    </form>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {FILTER_OPTIONS.map((option) => {
                            const isActive = selectedFilter === option;
                            const colorClass = option === 'VIDEO'
                                ? 'bg-brutal-yellow'
                                : option === 'ARTIKEL'
                                    ? 'bg-brutal-pink'
                                    : option === 'RPS'
                                        ? 'bg-brutal-purple'
                                        : option === 'KUIS'
                                            ? 'bg-emerald-400'
                                            : 'bg-white';

                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setSelectedFilter(option)}
                                    className={`px-4 py-1.5 text-xs font-black border-2 border-black tracking-wide cursor-pointer transition-all ${colorClass} ${isActive ? 'translate-y-[-1px] shadow-[2px_2px_0px_0px_#000]' : ''}`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <div className="flex justify-between items-center border-b-4 border-black pb-3 mb-8">
                <h3 className="text-2xl font-black tracking-tight uppercase">KELAS UNGGULAN</h3>
                <button className="px-3 py-1 text-xs font-black uppercase bg-black text-white border-2 border-black hover:bg-neutral-800 transition-colors">
                    Lihat Semua
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white border-4 border-black p-4 h-80 flex flex-col justify-between shadow-flat animate-pulse">
                            <div className="w-full h-36 bg-neutral-300 border-2 border-black mb-3"></div>
                            <div className="h-6 bg-neutral-300 w-3/4 mb-2"></div>
                            <div className="h-4 bg-neutral-300 w-1/2 mb-4"></div>
                            <div className="h-10 bg-neutral-300 w-full"></div>
                        </div>
                    ))}
                </div>
            ) : filteredCourses.length === 0 ? (
                <div className="border-4 border-black bg-brutal-yellow p-6 shadow-flat text-center font-black uppercase">
                    Tidak ada kelas yang cocok dengan pencarianmu.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCourses.map((course) => (
                        <article key={course.id} className="brutal-card flex flex-col overflow-hidden">
                            <div className="relative h-40 w-full bg-neutral-200 border-b-4 border-black overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <span className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-black border-2 border-black tracking-wider uppercase ${course.badgeColor}`}>
                                    {course.badgeType}
                                </span>
                            </div>

                            <div className="p-4 flex-grow flex flex-col justify-between bg-white">
                                <div className="mb-4">
                                    <h4 className="text-base font-black leading-tight uppercase mb-1 line-clamp-2">
                                        {course.title}
                                    </h4>
                                    <p className="text-xs text-gray-600 font-bold">
                                        Dosen: {course.instructor}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onSelectCourse(course)}
                                    className="w-full py-2.5 bg-black text-white font-black text-xs uppercase tracking-wider border-2 border-black flex items-center justify-center gap-2 hover:bg-brutal-purple hover:text-black transition-colors duration-150 cursor-pointer"
                                >
                                    Mulai Belajar
                                    <span className="text-lg leading-none">→</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
