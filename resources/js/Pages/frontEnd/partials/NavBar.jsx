import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <header>
            <nav className="bg-cls-dred navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    {/* <Link className="navbar-brand" to="/">
                        Matrimony
                    </Link> */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li> */}
                            <li className="nav-item">
                                <a className="nav-link" href="#success">
                                    Success Stories
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#about">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contact">
                                    Contact
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/posts">
                                    Posts
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/board">
                                    Board
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/order">
                                    Order
                                </Link>
                            </li>
                            
                        </ul>
                    </div>

                    {/* Right elements */}
                    <div className="d-flex align-items-center auth">
                        {/* Icon */}
                        {/* <a className="text-reset me-3" href="#">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </a> */}

                        <ul className='navbar-nav ml-auto'>
                            <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                        </ul>

                        {/* Notifications */}
                        <div className="dropdown">
                            <a
                                className="text-reset me-3 dropdown-toggle hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                aria-expanded="false"
                            >
                                {/* <FontAwesomeIcon icon={faBell} />
                                <span className="badge rounded-pill badge-notification bg-danger">
                                    1
                                </span> */}
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Some news
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Another news
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Avatar */}
                        <div className="dropdown">
                            <a
                                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuAvatar"
                                role="button"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="rounded-circle"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuAvatar"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">
                                        My profile
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Logout
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                    {/* Right elements */}
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
