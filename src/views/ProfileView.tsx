/** @author Agent 1 - UI/UX Layout & Agent 2 - Logic & Integration */
import React from 'react';
import type { UserProfile } from '../types/user';

/**
 * Halaman profil pengguna.
 */
export default function ProfileView({
    profile,
    onLogout
}: {
    profile: UserProfile;
    onLogout: () => void;
}) {
    return (
        <section className="border-4 border-black shadow-flat bg-white p-6 md:p-10 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase">Profil Mahasiswa</h2>
                    <p className="text-sm font-bold text-gray-700">Data akun Amikom Hub.</p>
                </div>
                <button
                    type="button"
                    onClick={onLogout}
                    className="px-4 py-2 font-black text-xs uppercase bg-brutal-yellow border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                >
                    Keluar
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-4 border-black p-4 bg-white shadow-flat">
                    <p className="text-xs font-black uppercase mb-2">Nama Lengkap</p>
                    <p className="text-sm font-bold text-gray-700">{profile.namaLengkap}</p>
                </div>
                <div className="border-4 border-black p-4 bg-white shadow-flat">
                    <p className="text-xs font-black uppercase mb-2">Email</p>
                    <p className="text-sm font-bold text-gray-700">{profile.email}</p>
                </div>
                <div className="border-4 border-black p-4 bg-brutal-pink shadow-flat">
                    <p className="text-xs font-black uppercase mb-2">Program Studi</p>
                    <p className="text-sm font-bold text-black">{profile.programStudi}</p>
                </div>
                <div className="border-4 border-black p-4 bg-brutal-purple shadow-flat">
                    <p className="text-xs font-black uppercase mb-2">Angkatan</p>
                    <p className="text-sm font-bold text-black">{profile.angkatan}</p>
                </div>
                <div className="border-4 border-black p-4 bg-white shadow-flat">
                    <p className="text-xs font-black uppercase mb-2">Kelas</p>
                    <p className="text-sm font-bold text-gray-700">{profile.kelas}</p>
                </div>
                <div className="border-4 border-black p-4 bg-brutal-yellow shadow-flat">
                    <p className="text-xs font-black uppercase mb-2">NIM</p>
                    <p className="text-sm font-bold text-black">{profile.nim}</p>
                </div>
            </div>
        </section>
    );
}
