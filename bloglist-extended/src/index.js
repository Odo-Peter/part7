import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';


import { BlogContextProvider } from './context/BlogContext';
import { AuthProvider } from './context/BlogContext';

import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <BlogContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BlogContextProvider>
    </QueryClientProvider>
  </Router>
);
