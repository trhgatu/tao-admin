// src/features/users/routes/users.route.ts
import React from 'react';
import { JournalListPage } from '@/features/journal/pages/JournalListPage';

export const journalsRoutes = [
  {
    path: '/journals',
    element: React.createElement(JournalListPage),
  },
];
