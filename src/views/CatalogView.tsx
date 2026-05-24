/** @author ArifWicak - UI/UX Layout & Pras - Logic & Integration */
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import type { Course } from '../types/course';
import courseImage01 from '../assets/course-01.svg';
import courseImage02 from '../assets/course-02.svg';
import courseImage03 from '../assets/course-03.svg';
import courseImage04 from '../assets/course-04.svg';

const FILTER_OPTIONS = ['ALL', 'VIDEO', 'ARTIKEL', 'RPS', 'KUIS'] as const;
const COURSE_IMAGES = [courseImage01, courseImage02, courseImage03, courseImage04];
const API_URL = 'https://6a12ff9978d0434e0d5db493.mockapi.io/api/v1/courses';

type CourseApi = Course & {
    course_name: string;
    badge_type: string;
    modules_raw?: string;
};

type ApiCourse = Partial<Course> & {
    id?: number | string;
    title?: string;
    description?: string;
    nama?: string;
    deskripsi?: string;
    instructor?: string;
    dosen?: string;
    badgeType?: string;
    badgeColor?: string;
    statusBadge?: string;
    image?: string;
    thumbnail?: string;
    cover?: string;
    students?: number | string;
    rating?: number | string;
    modules_raw?: string;
    modulesRaw?: string;
};

/**
 * Halaman katalog utama: hero, pencarian, filter, dan grid kartu.
 */
export default function CatalogView({
    onSelectCourse
}: {
    onSelectCourse: (course: Course) => void;
}) {
    const [courses, setCourses] = useState<CourseApi[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<(typeof FILTER_OPTIONS)[number]>('ALL');
    const [currentPage, setCurrentPage] = useState<number>(1);

    /** @author Pras - Logic & Integration */
    useEffect(() => {
        setLoading(true);
        axios.get<ApiCourse[]>(API_URL)
            .then((res) => {
                const normalized = res.data.map((item, index) => {
                    const idValue = Number(item.id);
                    const id = Number.isFinite(idValue) ? idValue : index + 1;
                    const course_name = item.course_name ?? item.title ?? `Mata Kuliah ${index + 1}`;
                    const description = item.description ?? item.deskripsi ?? 'Deskripsi belum tersedia.';
                    const instructor = item.instructor ?? item.dosen ?? 'Tim Dosen AMIKOM';
                    const badge_type = (item.badge_type ?? item.badgeType ?? 'VIDEO').toUpperCase();
                    const image = item.image ?? item.thumbnail ?? item.cover ?? COURSE_IMAGES[index % COURSE_IMAGES.length];
                    const students = Number.isFinite(Number(item.students)) ? Number(item.students) : 1000 + index * 27;
                    const rating = Number.isFinite(Number(item.rating)) ? Number(item.rating) : 4.8;

                    return {
                        id,
                        title: course_name,
                        description,
                        instructor,
                        badgeType: badge_type as Course['badgeType'],
                        badgeColor: 'bg-brutal-yellow',
                        statusBadge: index % 2 === 0 ? 'AKTIF' : 'BARU',
                        image,
                        students,
                        rating,
                        course_name,
                        badge_type,
                        modules_raw: item.modules_raw ?? item.modulesRaw
                    } as CourseApi;
                });

                setCourses(normalized);
                setCurrentPage(1);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Gagal memuat data kelas:', error);
                setLoading(false);
            });
    }, []);

    /** @author Pras - Logic & Integration */
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const matchesSearch = course.course_name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesBadge = selectedFilter === 'ALL' || course.badge_type === selectedFilter;
            return matchesSearch && matchesBadge;
        });
    }, [courses, searchQuery, selectedFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredCourses.length / 8));
    const indexOfLastItem = currentPage * 8;
    const indexOfFirstItem = indexOfLastItem - 8;
    const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

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
                    {currentCourses.map((course) => {
                        const badgeColor = course.badge_type === 'VIDEO'
                            ? 'bg-[#FCD34D]'
                            : course.badge_type === 'ARTIKEL'
                                ? 'bg-[#F472B6]'
                                : course.badge_type === 'RPS'
                                    ? 'bg-[#A78BFA]'
                                    : 'bg-emerald-400';

                        return (
                        <article key={course.id} className="brutal-card flex flex-col overflow-hidden">
                            <div className="relative h-40 w-full bg-neutral-200 border-b-4 border-black overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.course_name}
                                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
                                />
                                <span className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-black border-2 border-black tracking-wider uppercase ${badgeColor}`}>
                                    {course.badge_type}
                                </span>
                            </div>

                            <div className="p-4 flex-grow flex flex-col justify-between bg-white">
                                <div className="mb-4">
                                    <h4 className="text-base font-black leading-tight uppercase mb-1 line-clamp-2">
                                        {course.course_name}
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
                        );
                    })}
                </div>
            )}

            {!loading && filteredCourses.length > 0 && (
                <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
                    <button
                        type="button"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        className="px-4 py-2 font-black uppercase border-4 border-black shadow-flat bg-white hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        disabled={currentPage === 1}
                    >
                        Sebelumnya
                    </button>
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => {
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 font-black border-4 border-black shadow-flat transition-all ${currentPage === page ? 'bg-brutal-yellow' : 'bg-white'} hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        type="button"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        className="px-4 py-2 font-black uppercase border-4 border-black shadow-flat bg-white hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        disabled={currentPage === totalPages}
                    >
                        Selanjutnya
                    </button>
                </div>
            )}
        </section>
    );
}
