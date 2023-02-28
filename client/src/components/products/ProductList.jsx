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

const sorted = false;

function ProductList({ products, userData, addToCart }) {
  const [filteredData, setFilteredData] = useState();
  const [isAll, setIsAll] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isAll
    ? products.slice(indexOfFirstItem, indexOfLastItem)
    : filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const FashionHandler = () => {
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Fashion"));
  };

  const ArtHandler = () => {
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Art"));
  };
  const KidsHandler = () => {
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Kids"));
  };
  const SportHandler = () => {
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Sport"));
  };
  const TechHandler = () => {
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Tech"));
  };
  const HomeHandler = () => {
    setIsAll(false);
    setFilteredData(products.filter((item) => item.category === "Home"));
  };

  return (
    <article className="product_list">
      <div className="product_list_images">
        <div>
        <img src={fashion} alt="Fashion" onClick={FashionHandler} />
        <h6>Fashion & Beauty</h6>
        </div>
        <div>
        <img src={art} alt="art" onClick={ArtHandler} />
        <h6>Hand Made</h6>
        </div>
        <div>
        <img src={kids} alt="Fashion" onClick={KidsHandler} />
        <h6>Kids</h6>
        </div>
        <div>
        <img src={sport} alt="Fashion" onClick={SportHandler} />
        <h6>Sport</h6>
        </div>
        <div>
        <img src={tech} alt="Fashion" onClick={TechHandler} />
        <h6>Tech Product</h6>
        </div>
        <div>
        <img src={home} alt="Fashion" onClick={HomeHandler} />
        <h6>Home Apliences</h6>
        </div>
      </div>
      <main className="product_list_main">
        {currentItems?.map((p, index) => (
          <Product
            key={index}
            product={p}
            userData={userData}
            addToCart={addToCart}
          />
        ))}
      </main>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={isAll ? products.length : filteredData.length}
        paginate={paginate}
      />
    </article>
  );
}

export default ProductList;
