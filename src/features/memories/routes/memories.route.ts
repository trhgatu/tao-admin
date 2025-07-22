// src/features/users/routes/users.route.ts
import React from 'react';
import { MemoriesListPage } from '@/features/memories/pages/MemoriesListPage';

export const memoriesRoutes = [
  {
    path: '/memories',
    element: React.createElement(MemoriesListPage),
  },
];
