import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cookie from "js-cookie";
import { Header, Wrapper, Footer } from "./components";
import {
  HomePage,
  LoginPage,
  ProfilePage,
  ProductPage,
  SignupPage,
} from "./pages";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./styles/global.css";

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const verifyUser = async () => {
    const authCookie = cookie.get("auth-token");
    if (authCookie) {
      const query = await fetch("/api/user/verify", {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": authCookie,
        },
      });
      const result = await query.json();
      if (result) {
        setUser(result);
      }
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <BrowserRouter>
      <Wrapper>
        <Header user={user} setUser={setUser} cartItems={cartItems} />
        <div className="pt-3 px-4">
          <Routes>
            <Route
              path="/"
              element={<HomePage user={user} setCartItems={setCartItems} />}
            />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            <Route
              path="/product"
              element={
                <ProductPage
                  user={user}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
