import { Category, Product } from '@/types';

export const FALLBACK_CATEGORIES: Category[] = [
    {
        id: 'cat1',
        _id: 'cat1',
        name: 'FRP Slides',
        slug: 'frp-slides'
    },
    {
        id: 'cat2',
        _id: 'cat2',
        name: 'Swings & Climbers',
        slug: 'swings-climbers'
    },
    {
        id: 'cat3',
        _id: 'cat3',
        name: 'Outdoor Gym',
        slug: 'outdoor-gym'
    },
    {
        id: 'cat4',
        _id: 'cat4',
        name: 'Park Benches',
        slug: 'park-benches'
    },
    {
        id: 'cat5',
        _id: 'cat5',
        name: 'Merry-Go-Rounds',
        slug: 'merry-go-rounds'
    }
];

export const FALLBACK_PRODUCTS: Product[] = [
    {
        id: 'p1',
        _id: 'p1',
        name: 'Wave Slide',
        slug: 'wave-slide',
        description: 'High-quality durable FRP wave slide for playgrounds.',
        images: [
            '/WAVE SLIDE.png'
        ],
        categoryId: 'cat1',
        category: {
            id: 'cat1',
            name: 'FRP Slides',
            slug: 'frp-slides'
        }
    },
    {
        id: 'p2',
        _id: 'p2',
        name: 'Circular Swing',
        slug: 'circular-swing',
        description: 'Safe and fun circular swing for all ages.',
        images: [
            '/CIRCULAR SWING.png'
        ],
        categoryId: 'cat2',
        category: {
            id: 'cat2',
            name: 'Swings & Climbers',
            slug: 'swings-climbers'
        }
    },
    {
        id: 'p3',
        _id: 'p3',
        name: 'Rotator',
        slug: 'rotator',
        description: 'Advanced outdoor gym equipment for core strength.',
        images: [
            '/ROTATOR.png'
        ],
        categoryId: 'cat3',
        category: {
            id: 'cat3',
            name: 'Outdoor Gym',
            slug: 'outdoor-gym'
        }
    },
    {
        id: 'p4',
        _id: 'p4',
        name: 'Seesaw',
        slug: 'seesaw',
        description: 'Classic playground seesaw with ergonomic handles.',
        images: [
            '/SEESAW.png'
        ],
        categoryId: 'cat2',
        category: {
            id: 'cat2',
            name: 'Swings & Climbers',
            slug: 'swings-climbers'
        }
    },
    {
        id: 'p5',
        _id: 'p5',
        name: 'Duck Rider',
        slug: 'duck-rider',
        description: 'Fun duck-themed rider for young children.',
        images: [
            '/DUCK RIDER.png'
        ],
        categoryId: 'cat2',
        category: {
            id: 'cat2',
            name: 'Swings & Climbers',
            slug: 'swings-climbers'
        }
    },
    {
        id: 'p6',
        _id: 'p6',
        name: 'Horse Rider',
        slug: 'horse-rider',
        description: 'Strong FRP horse rider for playgrounds.',
        images: [
            '/HORSE RIDER.png'
        ],
        categoryId: 'cat2',
        category: {
            id: 'cat2',
            name: 'Swings & Climbers',
            slug: 'swings-climbers'
        }
    },
    {
        id: 'p7',
        _id: 'p7',
        name: 'Straight Slide',
        slug: 'straight-slide',
        description: 'Durable straight slide for children.',
        images: [
            '/STRAIGHT SLIDE.png'
        ],
        categoryId: 'cat1',
        category: {
            id: 'cat1',
            name: 'FRP Slides',
            slug: 'frp-slides'
        }
    },
    {
        id: 'p8',
        _id: 'p8',
        name: 'A Leg Swing',
        slug: 'a-leg-swing',
        description: 'Safe and sturdy A-leg swing set.',
        images: [
            '/‘A’ LEG SWING.png'
        ],
        categoryId: 'cat2',
        category: {
            id: 'cat2',
            name: 'Swings & Climbers',
            slug: 'swings-climbers'
        }
    }
];
