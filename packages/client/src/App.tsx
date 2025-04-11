import { Route, Routes } from 'react-router-dom'

import HomePage from '#/pages/HomePage'
import GroupInfo from './pages/GroupInfo'
import LocationInfo from './pages/LocationInfo'
// import LoginPage from '#/pages/LoginPage'
// import OAuthCallbackPage from '#/pages/OAuthCallbackPage'

function App() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-4 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/group/:groupTid" element={<GroupInfo />} />
          <Route
            path="/group/:groupTid/location/:locationTid"
            element={<LocationInfo />}
          />
          {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth-callback" element={<OAuthCallbackPage />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App
