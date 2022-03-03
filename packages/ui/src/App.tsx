import {
  Routes,
  Route,
  Outlet
} from 'react-router-dom';
import { AuthProvider } from './Auth/AuthProvider';
import { RequireAuth } from './Auth/RequireAuth';
import Layout from './layout/Layout';
import CampaignsPage from './pages/CampaignsPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/Login';
import MessagesPage from './pages/MessagesPage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={
            <Layout>
            <RequireAuth>
              <Routes>
                <Route index element={<DashboardPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="campaigns" element={<CampaignsPage />} />
                <Route path="messages" element={<MessagesPage />} />
              </Routes>
            </RequireAuth>
          </Layout>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
