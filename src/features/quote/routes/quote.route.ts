// src/features/users/routes/users.route.ts
import React from 'react';
import { QuoteListPage } from '@/features/quote/pages/QuoteListPage';

export const quotesRoutes = [
  {
    path: '/quotes',
    element: React.createElement(QuoteListPage),
  },
];
