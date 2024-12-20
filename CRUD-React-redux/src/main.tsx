import { Provider } from "react-redux";
import App from "./App.tsx";
import ReactDOM from 'react-dom/client';
import "./index.css";
import { store } from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<App />
	</Provider>,
);
