import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";
import { Toaster } from "react-hot-toast";

function App() {
	const { loading } = useLoadingWithRefresh();

	return loading ? (
		<Loader message="Loading please wait..." />
	) : (
		<BrowserRouter>
			<Toaster />
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
				<Route
					path="/rooms/:id"
					element={
						<ProtectedRoute>
							<Room />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

const GuestRoute = ({ children }) => {
	// get data from auth slice
	const { isAuth } = useSelector((state) => state.auth);

	return isAuth ? <Navigate to="/rooms" /> : children;
};

const SemiProtectedRoute = ({ children }) => {
	const { isAuth, user } = useSelector((state) => state.auth);

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
};

const ProtectedRoute = ({ children }) => {
	const { isAuth, user } = useSelector((state) => state.auth);

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
