import { AiOutlineShoppingCart } from 'react-icons/ai'; 


const Header = ({ user, cartItems }) => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid px-4">
                    <a className="navbar-brand" href="#">
                        Bobby's Bike Shop
                    </a>
                    <div>
                    <form className="d-flex" role="search">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-secondary" type="submit">Search</button>
                    </form>
                    </div>
                    <div>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href='#'
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <AiOutlineShoppingCart size={24} />
                                </a>
                                <div className='dropdown-menu'>
                                    <ul>
                                        { cartItems.map((item) => {
                                        return (
                                            <li>
                                            <p>{item.title}</p>
                                            <p>${item.price}</p>
                                            </li>
                                        )
                                        })}
                                    </ul>
                                    <form action='/api/checkout' method='POST'>
                                        <button>Checkout</button>
                                    </form>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href='#'
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown link
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

// { !user ? (
//   <>
//     <li className="nav-item">
//       <a className="nav-link" href="/signup">Signup</a>
//     </li>
//     <li className="nav-item">
//       <a className="nav-link" href="/login">Login</a>
//     </li>
//   </>
// ) : (
//   <>
//     <li className="nav-item">
//       <a className="nav-link" href="/profile">Profile</a>
//     </li>
//     <li className="nav-item">
//       <a className="nav-link" href="/logout">Logout</a>
//     </li>
//   </>
// )}
