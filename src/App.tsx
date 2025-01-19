import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Home from './pages/Home';
import About from './pages/About';
import Auth from './pages/Auth';
import Pricing from './pages/Pricing';
import Playbook from './pages/Playbook';
import ViewPlay from './pages/ViewPlay';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/pricing',
    element: <Pricing />,
  },
  {
    path: '/playbook',
    element: <Playbook />,
  },
  {
    path: '/plays/:id',
    element: <ViewPlay />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;