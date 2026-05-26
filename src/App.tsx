/** @author ArifWicak - UI/UX Layout & Pras - Logic & Integration */
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CatalogView from './views/CatalogView';
import CourseDetailView from './views/CourseDetailView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ProfileView from './views/ProfileView';
import PusatBantuanView from './views/PusatBantuanView';
import SyaratLayananView from './views/SyaratLayananView';
import KebijakanPrivasiView from './views/KebijakanPrivasiView';
import PetaKampusView from './views/PetaKampusView';
import type { Course } from './types/course';
import type { UserProfile } from './types/user';

type SelectedCourse = Course & {
    course_name?: string;
    code?: string;
    modules_raw?: string;
};

const STORAGE_KEY = 'selectedCourseData';

/**
 * Aplikasi utama dengan routing sederhana berbasis state dan localStorage.
 */
export default function App() {
    const [activePage, setActivePage] = useState<'catalog' | 'login' | 'register' | 'profile' | 'kebijakan-privasi' | 'syarat-layanan' | 'peta-kampus' | 'pusat-bantuan'>('catalog');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<SelectedCourse | null>(() => {
        if (typeof window === 'undefined') {
            return null;
        }
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            return null;
        }
        try {
            return JSON.parse(saved) as SelectedCourse;
        } catch {
            return null;
        }
    });

    /** @author Pras - Logic & Integration */
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (!selectedCourse) {
            window.localStorage.removeItem(STORAGE_KEY);
            return;
        }

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCourse));
    }, [selectedCourse]);

    /** @author Pras - Logic & Integration */
    const handleSelectCourse = (course: SelectedCourse | null) => {
        setSelectedCourse(course);
        if (typeof window === 'undefined') {
            return;
        }

        if (course) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(course));
            return;
        }

        window.localStorage.removeItem(STORAGE_KEY);
    };

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
                        handleSelectCourse(null);
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
                ) : activePage === 'kebijakan-privasi' ? (
                    <KebijakanPrivasiView onBack={() => setActivePage('catalog')} />
                ) : activePage === 'syarat-layanan' ? (
                    <SyaratLayananView onBack={() => setActivePage('catalog')} />
                ) : activePage === 'peta-kampus' ? (
                    <PetaKampusView onBack={() => setActivePage('catalog')} />
                ) : activePage === 'pusat-bantuan' ? (
                    <PusatBantuanView onBack={() => setActivePage('catalog')} />
                ) : selectedCourse ? (
                    <CourseDetailView
                        course={selectedCourse}
                        isLoading={false}
                        onBack={() => handleSelectCourse(null)}
                    />
                ) : (
                    <CatalogView
                        onSelectCourse={(course) => {
                            handleSelectCourse(course);
                            setActivePage('catalog');
                        }}
                    />
                )}
            </main>

            <Footer onNavigate={(page) => setActivePage(page as any)} />
        </div>
    );
}
