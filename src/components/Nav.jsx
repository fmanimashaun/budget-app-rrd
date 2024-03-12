import { Form, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { HiOutlineTrash } from "react-icons/hi";
import Logo from "../assets/logomark.svg";

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home page">
        <img src={Logo} alt="page logo" height={40} />
        <span>HomeBudget</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(e) => {
            if (!confirm("Delete user and all data?")) {
              e.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Delete User</span>
						<HiOutlineTrash height={20}/>
          </button>
        </Form>
      )}
    </nav>
  );
};

Nav.propTypes = {
  userName: PropTypes.string,
};

export default Nav;
