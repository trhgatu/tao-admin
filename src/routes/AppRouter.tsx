// src/routes/index.ts
import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '@/features/errors/pages/NotFound';
import { AdminLayout, AuthLayout } from '@/layouts';
// Import route modules
import { dashboardRoutes } from '@/features/dashboard/routes/dashboard.route';
import { authRoutes } from '@/features/auth/routes/auth.route';
import { usersRoutes } from '@/features/users/routes/user.route';
import { blogsRoutes } from '@/features/blog/routes/blog.route';
import { memoriesRoutes } from '@/features/memories/routes/memories.route';
import { journalsRoutes } from '@/features/journal/routes/journal.route';
import { quotesRoutes } from '@/features/quote/routes/quote.route';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [...authRoutes],
  },
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      ...dashboardRoutes,
      ...usersRoutes,
      ...blogsRoutes,
      ...memoriesRoutes,
      ...journalsRoutes,
      ...quotesRoutes,
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
