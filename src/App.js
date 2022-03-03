import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";

const isAuth = false;
const user = {
	activated: false
};

function App() {
	return (
		<BrowserRouter>
			<Navigation />
			<Routes>
				<Route
					path="/"
					exact
					element={
						<GuestRoute>
							<Home />
						</GuestRoute>
					}
				/>
				<Route
					path="/authenticate"
					element={
						<GuestRoute>
							<Authenticate />
						</GuestRoute>
					}
				/>
				<Route
					path="/activate"
					element={
						<SemiProtectedRoute>
							<Activate />
						</SemiProtectedRoute>
					}
				/>
				<Route
					path="/rooms"
					element={
						<ProtectedRoute>
							<Rooms />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

const GuestRoute = ({ children }) => {
	return isAuth ? <Navigate to="/rooms" /> : children;
};

const SemiProtectedRoute = ({ children }) => {
	if (!isAuth) {
		// if user is not logged-in
		return <Navigate to="/" />;
	} else if (!user.activated) {
		// if user is logged-in but not activated
		return children;
	} else {
		// if user is logged-in as well as activated
		return <Navigate to="/rooms" />;
	}

	// return !isAuth ? (
	// 	<Navigate to="/" />
	// ) : isAuth && !user.activated ? (
	// 	children
	// ) : (
	// 	<Navigate to="/rooms" />
	// );
};

const ProtectedRoute = ({ children }) => {
	if (!isAuth) {
		// if user is not logged-in
		return <Navigate to="/" />;
	} else if (!user.activated) {
		// if user is logged-in but not activated
		return <Navigate to="/activate" />;
	} else {
		// if user is logged-in as well as activated
		return children;
	}
};

export default App;
