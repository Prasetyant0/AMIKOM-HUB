/** @author ArifWicak - UI/UX Layout & Pras - Logic & Integration */
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CatalogView from './views/CatalogView';
import CourseDetailView from './views/CourseDetailView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ProfileView from './views/ProfileView';
import type { Course } from './types/course';
import type { UserProfile } from './types/user';
import courseImage01 from './assets/course-01.svg';
import courseImage02 from './assets/course-02.svg';
import courseImage03 from './assets/course-03.svg';
import courseImage04 from './assets/course-04.svg';

const STORAGE_KEY = 'selectedCourseId';
const COURSE_IMAGES = [courseImage01, courseImage02, courseImage03, courseImage04];

/**
 * Aplikasi utama dengan routing sederhana berbasis state dan localStorage.
 */
export default function App() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activePage, setActivePage] = useState<'catalog' | 'login' | 'register' | 'profile'>('catalog');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(() => {
        if (typeof window === 'undefined') {
            return null;
        }

        const storedValue = window.localStorage.getItem(STORAGE_KEY);
        const parsed = storedValue ? Number(storedValue) : null;
        return Number.isFinite(parsed) ? parsed : null;
    });

    /** @author Pras - Logic & Integration */
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        if (selectedCourseId === null) {
            window.localStorage.removeItem(STORAGE_KEY);
            return;
        }

        window.localStorage.setItem(STORAGE_KEY, String(selectedCourseId));
    }, [selectedCourseId]);

    /** @author Pras - Logic & Integration */
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then(res => {
                const mockInstructors = ['Dr. Salsabila', 'Ibu Ratna', 'Bpk. Rakhmat', 'Ibu Intan', 'Bpk. Damar', 'Ibu Fitri'];
                const mockBadges: Course['badgeType'][] = ['VIDEO', 'ARTIKEL', 'RPS', 'KUIS'];
                const mockColors = ['bg-brutal-purple', 'bg-brutal-yellow', 'bg-brutal-pink', 'bg-emerald-400'];
                const mockTitles = [
                    'Arsitektur Antarmuka Neo-Brutalis',
                    'Dasar Sistem Desain Modern',
                    'Perancangan Grid dan Tipografi',
                    'Manajemen Modul Pembelajaran RPS',
                    'Strategi UX Kontras Tinggi',
                    'Praktik Kolaborasi Desain Brutal',
                    'Membangun Komponen Interaktif',
                    'Audit Visual Aksesibilitas',
                    'Workflow Frontend Produktif',
                    'Kelas Capstone: Portofolio Brutal'
                ];
                const mockDescriptions = [
                    'Pelajari fondasi arsitektur antarmuka brutal yang tegas dan siap produksi.',
                    'Rancang sistem desain konsisten untuk kebutuhan akademik AMIKOM.',
                    'Kuasai aturan grid, ritme visual, dan tipografi berani.',
                    'Susun modul belajar berdasarkan RPS dengan struktur yang rapi.',
                    'Strategi UX untuk menjaga keterbacaan pada kontras ekstrem.',
                    'Kolaborasi lintas tim untuk membangun komponen brutal yang kuat.',
                    'Bangun komponen UI interaktif dengan hover dan active state yang presisi.',
                    'Audit desain untuk memastikan aksesibilitas dan konsistensi warna.',
                    'Workflow frontend dari perencanaan hingga delivery cepat.',
                    'Finalisasi portofolio brutal sebagai proyek akhir.'
                ];

                const enhancedData: Course[] = res.data.map((item: { id: number }, index: number) => ({
                    id: item.id,
                    title: mockTitles[index % mockTitles.length],
                    description: mockDescriptions[index % mockDescriptions.length],
                    instructor: mockInstructors[index % mockInstructors.length],
                    badgeType: mockBadges[index % mockBadges.length],
                    badgeColor: mockColors[index % mockColors.length],
                    statusBadge: index % 2 === 0 ? 'AKTIF' : 'BARU',
                    image: COURSE_IMAGES[index % COURSE_IMAGES.length],
                    students: 920 + index * 37,
                    rating: 4.7 + (index % 3) * 0.1
                }));

                setCourses(enhancedData);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const selectedCourse = useMemo(() => {
        if (selectedCourseId === null) {
            return null;
        }

        return courses.find((course) => course.id === selectedCourseId) ?? null;
    }, [courses, selectedCourseId]);

    const isAuthenticated = Boolean(profile);
    const showAuthPage = activePage === 'login' || activePage === 'register' || activePage === 'profile';

    return (
        <div className="min-h-screen flex flex-col bg-white text-black antialiased selection:bg-brutal-yellow selection:text-black">
            <Navbar
                activePage={activePage}
                isAuthenticated={isAuthenticated}
                onNavigate={(page) => {
                    setActivePage(page);
                    if (page !== 'profile') {
                        setSelectedCourseId(null);
                    }
                }}
            />

            <main className="flex-grow max-w-[1440px] w-full mx-auto px-6 py-8">
                {showAuthPage ? (
                    activePage === 'login' ? (
                        <LoginView
                            onLogin={(userProfile) => {
                                setProfile(userProfile);
                                setActivePage('profile');
                            }}
                            onGoRegister={() => setActivePage('register')}
                        />
                    ) : activePage === 'register' ? (
                        <RegisterView
                            onRegister={(userProfile) => {
                                setProfile(userProfile);
                                setActivePage('profile');
                            }}
                            onGoLogin={() => setActivePage('login')}
                        />
                    ) : profile ? (
                        <ProfileView
                            profile={profile}
                            onLogout={() => {
                                setProfile(null);
                                setActivePage('catalog');
                            }}
                        />
                    ) : (
                        <LoginView
                            onLogin={(userProfile) => {
                                setProfile(userProfile);
                                setActivePage('profile');
                            }}
                            onGoRegister={() => setActivePage('register')}
                        />
                    )
                ) : selectedCourseId ? (
                    <CourseDetailView
                        course={selectedCourse}
                        isLoading={loading}
                        onBack={() => setSelectedCourseId(null)}
                    />
                ) : (
                    <CatalogView
                        courses={courses}
                        loading={loading}
                        onSelectCourse={(course) => {
                            setSelectedCourseId(course.id);
                            setActivePage('catalog');
                        }}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}
