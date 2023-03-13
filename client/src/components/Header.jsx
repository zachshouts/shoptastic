import { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { RxAvatar } from 'react-icons/rx';


const Header = ({ user, setUser, cartItems }) => {

    const [cartQuantity, setCartQuantity] = useState(0);

    console.log(user)

    const logout = () => {
        cookie.remove('auth-token');
        setUser(null);
        window.location.reload();
    }

    useEffect(() => {
        cartItems.map((item) => {
            setCartQuantity(cartQuantity + parseInt(item.quantity))
            })
        }, [cartItems])

    return (
        <header>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid px-4 ">
                  <div className='col-2'>
                    <a href="/">
                        <img src="/img/biketastic_logo.png" className='logo img-responsive'/>
                    </a>
                  </div>
                    <div className="search-bar">
                    <form className="d-flex" role="search">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-light" type="submit"><GiMagnifyingGlass /></button>
                    </form>
                    </div>
                    <div className='mx-2'>
                        <ul className="navbar-nav navbar-items">
                            
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href='#'
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        >
                                        <RxAvatar size={24} className='avatar'/>
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
                                <li className="nav-item dropdown">
                            
                                <a
                                    className="nav-link dropdown-toggle"
                                    href='#'
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                > 
                               
                                <div className="cart" >
                                    <span className="count">{cartQuantity}</span>
                                    <AiOutlineShoppingCart size={24} className='shopping-cart'/>
                                </div>
                                </a>
                                <div className='dropdown-menu drop-menu-start cart-menu' style={{left: "auto", right:0, width: "300px"}}>
                                        <ul>
                                        {cartItems.length === 0 ? (<p>Your cart is empty</p>) : 
                                            ( cartItems.map((item) => {
                                                return (
                                                    <li key={item.stripe_id}>
                                                        <p>{item.title}</p>
                                                        <p>${item.price}</p>
                                                        <p>Quantity:{item.quantity}</p>
                                                    </li>
                                                    )
                                                }))
                                            }
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
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;

