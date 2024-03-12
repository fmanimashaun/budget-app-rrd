import { Link, useNavigate, useRouteError } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { HiArrowUturnLeft } from "react-icons/hi2";

const ErrorPage = () => {
	const error = useRouteError();
	const navigate = useNavigate();


  return (<div className="error">
		<h1>{"Uh oh! We've got a problem."}</h1>
		<p>{error.message || error.statusText}</p>
		<div className="flex-md">
			<button type="button" className="btn btn--dark" onClick={() => navigate(-1)}>
			<HiArrowUturnLeft />
				<span>Go back</span>
			</button>
			<Link to="/" className="btn btn--dark">
			<HiOutlineHome />
				<span>Home</span>
			</Link>
		</div>
	</div>);
};

export default ErrorPage;
