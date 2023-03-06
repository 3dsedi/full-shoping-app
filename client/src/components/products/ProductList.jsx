import Product from "./Product.jsx";
import fashion from "./k1-copy.jpg";
import art from "./art.jpg";
import kids from "./kids.jpg";
import sport from "./sport.jpg";
import tech from "./tech.jpg";
import home from "./home.jpg";
import "./ProductList.css";
import { useState } from "react";
import { Pagination } from "./Pagination.jsx";
import { Link } from "react-router-dom";

const sorted = false;

function ProductList({ products, userData, addToCart }) {
  const [filteredData, setFilteredData] = useState();
  const [isAll, setIsAll] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isAll
    ? products.slice(indexOfFirstItem, indexOfLastItem)
    : filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const FashionHandler = () => {
    setSelectedCategory("Fashion & Beauty");
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Fashion"));
  };

  const ArtHandler = () => {
    setSelectedCategory("Hand Made & Art");
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Art"));
  };
  const KidsHandler = () => {
    setSelectedCategory("Kid Products");
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Kids"));
  };
  const SportHandler = () => {
    setSelectedCategory("Sport");
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Sport"));
  };
  const TechHandler = () => {
    setSelectedCategory("Tech Product");
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Tech"));
  };
  const HomeHandler = () => {
    setSelectedCategory("Home Apliences");
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Home"));
  };

  return (
    <div >
      <div className="product_list_images">
        <div>
        <img src={fashion} alt="Fashion" onClick={FashionHandler} />
        <p>Fashion & Beauty</p>
        </div>
        <div>
        <img src={art} alt="art" onClick={ArtHandler} />
        <p>Hand Made & Art</p>
        </div>
        <div>
        <img src={kids} alt="Fashion" onClick={KidsHandler} />
        <p>Kid Products</p>
        </div>
        <div>
        <img src={sport} alt="Fashion" onClick={SportHandler} />
        <p>Sport</p>
        </div>
        <div>
        <img src={tech} alt="Fashion" onClick={TechHandler} />
        <p>Tech Product</p>
        </div>
        <div>
        <img src={home} alt="Fashion" onClick={HomeHandler} />
        <p>Home Apliences</p>
        </div>
      </div>
      {selectedCategory ? (
        <p className="productlist_title">{selectedCategory}</p>
      ) : (
        <p className="productlist_title">All Products</p>
      )}
       <div className="product_card_container">
        {currentItems?.map((p, index) => (
          <Link key={index} to={`/products/${p.productId}`}>
            <Product product={p} userData={userData} addToCart={addToCart} onClick={() => { window.location.href=`/products/${p.productId}` }}/>
          </Link>
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={isAll ? products.length : filteredData.length}
        paginate={paginate}
      />
    </div>
  );
}

export default ProductList;
