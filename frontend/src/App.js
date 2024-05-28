// import LoginForm from './components/LoginForm/LoginForm';
import Report from './pages/Report';
import LoginForm from './pages/LoginForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/report" element={<Report />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
