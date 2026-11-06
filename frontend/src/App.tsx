import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/StudentLogin";
import Exam from "./components/Exam";
import FeedbackPage from "./components/ExamResult";
import { usePopup } from "./hooks/usePopup";
import { useLogin } from "./hooks/useLogin";
import Popup from "./modal/Popup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { popup, handleOpenPopup, handleClosePopup } = usePopup();

  const { isLoggedIn, handleLogin, handleLogout } = useLogin(
    handleOpenPopup,
    handleClosePopup,
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />

        <Route
          path="/examen"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Exam handleOpenPopup={handleOpenPopup} onClose={handleClosePopup} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/retroalimentacion"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <FeedbackPage handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/*"
          element={<LoginPage handleLogin={handleLogin}/>}
        />
      </Routes>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </>
  );
}

export default App;
