import "./Header.css";
import iconMenu from "/icon-menu.svg";
import iconClose from "/icon-close.svg";
import avatarImage from "/image-avatar.png";
import imageCart from "/icon-cart.svg";
import { useState } from "react";

function Header({ products }) {
  const [menu, setMenu] = useState(false);

  const handleMenu = (binary) => {
    setMenu(binary);
  };

  return (
    <header
      className={`header ${menu ? "header--menu-open" : "header--menu-closed"}`}
    >
      <div className="header-backdrop | display-none-desktop"></div>
      <div className="container header-container header-wrap">
        <div className="header-wrap">
          <HeaderLogo handleMenu={handleMenu} />
          <HeaderNav handleMenu={handleMenu} />
        </div>
        <HeaderIcons>{!menu && <CartModal products={products} />}</HeaderIcons>
      </div>
      <div className="container">
        <div className="container header-line | display-none-mobile"></div>
      </div>
    </header>
  );
}

function CartModal({ products }) {
  return (
    <div className="cart-modal | round-1">
      <h2 className="cart-modal__heading | fs-300 fw-bold modal-padding">
        Cart
      </h2>
      <div className="cart-modal__line header-line"></div>
      {products.length ? (
        <>
          <div className="products | modal-padding">
            {products.map((info) => (
              <Product key={info.name} info={info} />
            ))}
          </div>
          <div className="modal-padding">
            <button className="cart-modal__button | clr-neutral-100 round-1">
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="cart-modal--error">
          <p className="fs-300 fw-bold clr-neutral-400">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
}

function Product({ info: { name, price, number, image } }) {
  return (
    <article className="product | fs-300">
      <img className="product__image" src={image} alt={`${name}'s image`} />
      <div>
        <h3 className="product__heading">{name}</h3>
        <p>
          <span className="product__price">{`$${price}`}</span>
          <span className="product__number">{`x${number}`}</span>
          <span className="product__final | fw-bold">{`$${
            Number(number) * Number(price)
          }.00`}</span>
        </p>
      </div>
    </article>
  );
}

function HeaderLogo({ handleMenu }) {
  return (
    <>
      <img
        src={iconMenu}
        alt="open menu"
        className="header__open-icon | display-none-desktop"
        onClick={() => handleMenu(true)}
      />
      <p className="header__logo | fw-bold fs-700">sneakers</p>
    </>
  );
}

function HeaderNav({ handleMenu }) {
  const links = [
    {
      value: "Collections",
      href: "/",
      id: 1,
    },
    {
      value: "Men",
      href: "/",
      id: 2,
    },
    {
      value: "Women",
      href: "/",
      id: 3,
    },
    {
      value: "About",
      href: "/",
      id: 4,
    },
    {
      value: "Contact",
      href: "/",
      id: 5,
    },
  ];
  const linkElements = links.map((info) => (
    <li className="navigation__item" key={info.id}>
      <a href={info.href}>{info.value}</a>
    </li>
  ));

  return (
    <nav className="navigation">
      <button
        className="navigation__close | display-none-desktop"
        onClick={() => handleMenu(false)}
      >
        <img
          src={iconClose}
          alt="close menu"
          className="navigation__close-icon | clr-neutral-400"
        />
      </button>
      <ul
        role="list"
        className="navigation__list | header-wrap clr-neutral-400"
      >
        {linkElements}
      </ul>
    </nav>
  );
}

function HeaderIcons({ children }) {
  const [cart, setCart] = useState(false);

  // const handleCart = (binary, reverse = false) => {
  //   reverse ? setCart((prev) => !prev) : setCart(binary);
  // };

  return (
    <div className="header-icons header-wrap">
      <button onClick={() => setCart((prev) => !prev)}>
        <img src={imageCart} alt="cart" className="header-icons__cart cart" />
        {cart && children}
      </button>
      <img
        className="header-icons__avatar"
        src={avatarImage}
        alt="avatar-image"
      />
    </div>
  );
}

export default Header;
