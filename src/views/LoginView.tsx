/** @author Agent 1 - UI/UX Layout & Agent 2 - Logic & Integration */
import React, { useState } from 'react';
import type { UserProfile } from '../types/user';

/**
 * Halaman login dummy.
 */
export default function LoginView({
    onLogin,
    onGoRegister
}: {
    onLogin: (profile: UserProfile) => void;
    onGoRegister: () => void;
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onLogin({
            namaLengkap: 'Mahasiswa AMIKOM',
            programStudi: 'Informatika',
            angkatan: '2024',
            kelas: 'IF-01',
            nim: '24.11.1234',
            email
        });
    };

    return (
        <section className="border-4 border-black shadow-flat bg-white p-6 md:p-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-3">Masuk</h2>
            <p className="text-sm font-bold text-gray-700 mb-6">
                Masuk untuk melanjutkan pembelajaran di Amikom Hub.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-2 text-xs font-black uppercase">
                    Email
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="nama@email.com"
                        className="p-3 border-4 border-black font-bold focus:outline-none"
                        required
                    />
                </label>
                <label className="flex flex-col gap-2 text-xs font-black uppercase">
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="********"
                        className="p-3 border-4 border-black font-bold focus:outline-none"
                        required
                    />
                </label>

                <button
                    type="submit"
                    className="w-full py-3 font-black uppercase bg-brutal-purple border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                >
                    Masuk
                </button>
            </form>

            <div className="flex items-center gap-3 my-6">
                <div className="flex-1 border-t-4 border-black" />
                <span className="text-xs font-black uppercase">Atau</span>
                <div className="flex-1 border-t-4 border-black" />
            </div>

            <button
                type="button"
                onClick={() => onLogin({
                    namaLengkap: 'Mahasiswa Google',
                    programStudi: 'Sistem Informasi',
                    angkatan: '2023',
                    kelas: 'SI-02',
                    nim: '23.12.5678',
                    email: 'google@amikom.ac.id'
                })}
                className="w-full py-3 font-black uppercase bg-brutal-yellow border-4 border-black shadow-flat hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-flat-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
                Masuk dengan Google
            </button>

            <p className="mt-6 text-xs font-bold text-gray-700">
                Belum punya akun?{' '}
                <button type="button" onClick={onGoRegister} className="underline">
                    Daftar sekarang
                </button>
            </p>
        </section>
    );
}
