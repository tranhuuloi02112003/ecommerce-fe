import { Link } from "react-router-dom";
import routes from "../../config/routes";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">E-Commerce Store</h1>
        <nav>
          <ul className="flex gap-[30px] list-none">
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>
              <Link to={routes.products}>Products</Link>
            </li>
            <li>
              <Link to={routes.cart}>Cart</Link>
            </li>
            <li>
              <Link to={routes.profile}>Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
