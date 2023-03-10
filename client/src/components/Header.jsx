import cookie from 'js-cookie';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';


const Header = ({ user, setUser, cartItems }) => {


    const logout = () => {
        cookie.remove('auth-token');
        setUser(null);
        window.location.reload();
    }

    return (
        <header className='px-3'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid px-4">
                    <a className="navbar-brand" href="/">
                        Bobby's Bike Shop
                    </a>
                    <div>
                    <form className="d-flex" role="search">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-secondary" type="submit">Search</button>
                    </form>
                    </div>
                    <div className='mx-2'>
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
                                                    <li key={item.stripe_id}>
                                                        <p>{item.title}</p>
                                                        <p>${item.price}</p>
                                                    </li>
                                                    )
                                                })}
                                        </ul>

                                    <form action='/api/checkout' method='POST'>
                                        { cartItems.map((item) => {
                                            return (
                                                <>
                                                    <input type={'hidden'} name={'Price[]'} key={item.stripe_id} value={item.stripe_id} />
                                                    <input type={'hidden'} name={'Quantity[]'} value={item.quantity} />
                                                </>
                                            )
                                        })}
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
                                        <RxAvatar size={24}/>
                                    </a>
                                    <ul className="dropdown-menu">
                                        { !user ? (
                                            <li>
                                                <a href='/login'>Login</a>
                                            </li>
                                        ) : (
                                            <>
                                                <li>
                                                    <a className="dropdown-item" href="/profile">
                                                        Profile
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="/" onClick={logout} >
                                                        Sign Out
                                                    </a>
                                                </li>
                                            </>
                                        )}
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

