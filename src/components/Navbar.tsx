/** @author ArifWicak - UI/UX Layout */
import React, { useState } from 'react';

type NavPage = 'catalog' | 'login' | 'register' | 'profile';

/**
 * Navigasi utama aplikasi.
 */
/**
 * Navigasi utama aplikasi.
 */
export default function Navbar({
    activePage,
    isAuthenticated,
    onNavigate
}: {
    activePage: NavPage;
    isAuthenticated: boolean;
    onNavigate: (page: NavPage) => void;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full bg-white border-b-4 border-black sticky top-0 z-50">
            <div className="max-w-[1440px] mx-auto px-6 h-20 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-black tracking-tighter uppercase">
                        AMIKOM<span className="text-brutal-purple">.</span>HUB
                    </h1>
                    <nav className="hidden md:flex items-center gap-6 font-bold text-sm tracking-tight">
                        <button
                            type="button"
                            onClick={() => onNavigate('catalog')}
                            className={`transition-colors ${activePage === 'catalog' ? 'text-brutal-pink underline decoration-2 underline-offset-4' : 'hover:text-brutal-purple'}`}
                        >
                            Eksplorasi
                        </button>
                        <button type="button" className="hover:text-brutal-purple transition-colors">
                            Pembelajaran Saya
                        </button>
                        <button type="button" className="hover:text-brutal-purple transition-colors">
                            Mentor
                        </button>
                        <button type="button" className="hover:text-brutal-purple transition-colors">
                            Forum
                        </button>
                        {isAuthenticated && (
                            <button
                                type="button"
                                onClick={() => onNavigate('profile')}
                                className={`transition-colors ${activePage === 'profile' ? 'text-brutal-pink underline decoration-2 underline-offset-4' : 'hover:text-brutal-purple'}`}
                            >
                                Profil
                            </button>
                        )}
                    </nav>
                </div>
                <div className="hidden md:flex items-center gap-3">
                    {!isAuthenticated && (
                        <button
                            type="button"
                            onClick={() => onNavigate('register')}
                            className="px-4 py-2 font-black text-sm uppercase bg-white border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                        >
                            Daftar
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => onNavigate(isAuthenticated ? 'profile' : 'login')}
                        className="px-5 py-2 font-black text-sm uppercase bg-brutal-purple border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
                    >
                        {isAuthenticated ? 'Profil' : 'Masuk'}
                    </button>
                </div>
                <button
                    type="button"
                    aria-label="Buka menu"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden px-3 py-2 border-4 border-black bg-brutal-yellow font-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                >
                    MENU
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden border-t-4 border-black bg-white px-6 py-4 flex flex-col gap-3 font-black text-sm uppercase">
                    <button type="button" onClick={() => { onNavigate('catalog'); setIsMenuOpen(false); }}>
                        Eksplorasi
                    </button>
                    <button type="button" onClick={() => setIsMenuOpen(false)}>Pembelajaran Saya</button>
                    <button type="button" onClick={() => setIsMenuOpen(false)}>Mentor</button>
                    <button type="button" onClick={() => setIsMenuOpen(false)}>Forum</button>
                    {isAuthenticated && (
                        <button type="button" onClick={() => { onNavigate('profile'); setIsMenuOpen(false); }}>
                            Profil
                        </button>
                    )}
                    {!isAuthenticated && (
                        <button type="button" onClick={() => { onNavigate('register'); setIsMenuOpen(false); }}>
                            Daftar
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => { onNavigate(isAuthenticated ? 'profile' : 'login'); setIsMenuOpen(false); }}
                        className="px-4 py-2 bg-brutal-purple border-4 border-black shadow-flat"
                    >
                        {isAuthenticated ? 'Profil' : 'Masuk'}
                    </button>
                </div>
            )}
        </header>
    );
}
