/** @author ArifWicak - UI/UX Layout */
import React from 'react';

/**
 * Footer informasi hak cipta dan tautan kebijakan.
 */
export default function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
    return (
        <footer className="w-full bg-black text-white border-t-4 border-black py-8 mt-20">
            <div className="max-w-[1440px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold tracking-tight">
                <div className="flex flex-col gap-1 items-center sm:items-start">
                    <span className="text-sm font-black tracking-wider">Amikom Hub</span>
                    <p className="text-gray-400">© 2026 Amikom Hub. Dibuat oleh DoaIbuDev.</p>
                </div>
                <div className="flex flex-wrap gap-4 text-gray-400 justify-center">
                    <button type="button" onClick={() => onNavigate('kebijakan-privasi')} className="hover:text-white transition-colors">Kebijakan Privasi</button>
                    <button type="button" onClick={() => onNavigate('syarat-layanan')} className="hover:text-white transition-colors">Syarat Layanan</button>
                    <button type="button" onClick={() => onNavigate('peta-kampus')} className="hover:text-white transition-colors">Peta Kampus</button>
                    <button type="button" onClick={() => onNavigate('pusat-bantuan')} className="hover:text-white transition-colors">Pusat Bantuan</button>
                </div>
            </div>
        </footer>
    );
}
