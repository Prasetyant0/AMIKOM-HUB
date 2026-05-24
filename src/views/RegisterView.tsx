/** @author ArifWicak - UI/UX Layout & Pras - Logic & Integration */
import React, { useState } from 'react';
import type { UserProfile } from '../types/user';

/**
 * Halaman daftar dummy.
 */
export default function RegisterView({
    onRegister,
    onGoLogin
}: {
    onRegister: (profile: UserProfile) => void;
    onGoLogin: () => void;
}) {
    const [form, setForm] = useState({
        namaLengkap: '',
        programStudi: '',
        angkatan: '',
        kelas: '',
        nim: '',
        email: ''
    });

    const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onRegister(form);
    };

    return (
        <section className="border-4 border-black shadow-flat bg-white p-6 md:p-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-3">Daftar Akun</h2>
            <p className="text-sm font-bold text-gray-700 mb-6">
                Lengkapi data kamu untuk bergabung di Amikom Hub.
            </p>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-2 text-xs font-black uppercase">
                    Nama Lengkap
                    <input
                        type="text"
                        value={form.namaLengkap}
                        onChange={handleChange('namaLengkap')}
                        placeholder="Nama lengkap"
                        className="p-3 border-4 border-black font-bold focus:outline-none"
                        required
                    />
                </label>
                <label className="flex flex-col gap-2 text-xs font-black uppercase">
                    Program Studi
                    <input
                        type="text"
                        value={form.programStudi}
                        onChange={handleChange('programStudi')}
                        placeholder="Informatika"
                        className="p-3 border-4 border-black font-bold focus:outline-none"
                        required
                    />
                </label>
                <label className="flex flex-col gap-2 text-xs font-black uppercase">
                    Angkatan
                    <input
                        type="text"
                        value={form.angkatan}
                        onChange={handleChange('angkatan')}
                        placeholder="2024"
                        className="p-3 border-4 border-black font-bold focus:outline-none"
                        required
                    />
                </label>
                <label className="flex flex-col gap-2 text-xs font-black uppercase">
                    Kelas
                    <input
                        type="text"
                        value={form.kelas}
                        onChange={handleChange('kelas')}
                        placeholder="IF-01"
                        className="p-3 border-4 border-black font-bold focus:outline-none"
                        required
                    />
                </label>
                <label className="flex flex-col gap-2 text-xs font-black uppercase">
                    NIM
                    <input
                        type="text"
                        value={form.nim}
                        onChange={handleChange('nim')}
                        placeholder="24.11.1234"
                        className="p-3 border-4 border-black font-bold focus:outline-none"
                        required
                    />
                </label>
                <label className="flex flex-col gap-2 text-xs font-black uppercase">
                    Email
                    <input
                        type="email"
                        value={form.email}
                        onChange={handleChange('email')}
                        placeholder="nama@email.com"
                        className="p-3 border-4 border-black font-bold focus:outline-none"
                        required
                    />
                </label>

                <div className="md:col-span-2 flex flex-col gap-3">
                    <button
                        type="submit"
                        className="w-full py-3 font-black uppercase bg-brutal-purple border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                        Daftar
                    </button>
                    <button
                        type="button"
                        onClick={() => onRegister({
                            namaLengkap: 'Mahasiswa Google',
                            programStudi: 'Sistem Informasi',
                            angkatan: '2023',
                            kelas: 'SI-02',
                            nim: '23.12.5678',
                            email: 'google@amikom.ac.id'
                        })}
                        className="w-full py-3 font-black uppercase bg-brutal-yellow border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                    >
                        Daftar dengan Google
                    </button>
                </div>
            </form>

            <p className="mt-6 text-xs font-bold text-gray-700">
                Sudah punya akun?{' '}
                <button type="button" onClick={onGoLogin} className="underline">
                    Masuk di sini
                </button>
            </p>
        </section>
    );
}
