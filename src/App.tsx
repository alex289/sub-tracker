import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/layout';
import { AddSubscriptionPage } from './pages/add-subscription';
import { EditSubscriptionPage } from './pages/edit-subscription';
import { HomePage } from './pages/home';
import { StatisticsPage } from './pages/statistics';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddSubscriptionPage />} />
        <Route path="/edit/:id" element={<EditSubscriptionPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
