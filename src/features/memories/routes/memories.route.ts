import React from 'react';
import { MemoriesListPage, MemoryCreatePage } from '@/features/memories/pages';
export const memoriesRoutes = [
  {
    path: '/memories',
    element: React.createElement(MemoriesListPage),
  },
  {
    path: '/memories/create',
    element: React.createElement(MemoryCreatePage),
  },
];
