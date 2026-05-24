import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import App from '../App';

vi.mock('axios', () => ({
    default: {
        get: vi.fn()
    }
}));

const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

const mockApiData = [{ id: 1 }, { id: 2 }, { id: 3 }];

beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockApiData });
    window.localStorage.clear();
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('App state persistence', () => {
    it('memulihkan halaman detail dari localStorage', async () => {
        window.localStorage.setItem('selectedCourseId', '1');

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText('← Kembali ke Katalog')).toBeInTheDocument();
        });
    });

    it('menyimpan pilihan kursus ke localStorage saat membuka detail', async () => {
        render(<App />);

        const button = await screen.findByRole('button', { name: /Mulai Belajar/i });
        fireEvent.click(button);

        await waitFor(() => {
            expect(window.localStorage.getItem('selectedCourseId')).toBe('1');
        });
    });
});
