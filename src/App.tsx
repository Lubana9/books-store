import { BrowserRouter, Route, Navigate } from "react-router-dom";

import BookStorePage from "./pages/BookStorePage";

function App() {
  return (
    <BrowserRouter>
      <Route path="/store" element={<BookStorePage />} />
      <Navigate to="/store" />
    </BrowserRouter>
  );
}

export default App;
