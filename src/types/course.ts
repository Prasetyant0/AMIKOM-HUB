/**
 * Tipe data utama untuk kursus dan modul RPS.
 */
export type Course = {
    id: number;
    title: string;
    description: string;
    instructor: string;
    badgeType: 'VIDEO' | 'ARTIKEL' | 'RPS' | 'KUIS';
    badgeColor: string;
    statusBadge: 'AKTIF' | 'BARU';
    image: string;
    students: number;
    rating: number;
};

export type CourseModuleStatus = 'SELESAI' | 'SEDANG BERJALAN' | 'TERKUNCI';

export type CourseModule = {
    week: string;
    title: string;
    duration: string;
    status: CourseModuleStatus;
};
