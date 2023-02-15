import Product from './Product.jsx';
// import "../../App.css"
import './ProductList.css'
import CategorySorter from "./CategorySorter.jsx";
import { useRef , useState} from 'react';
import { Pagination } from './Pagination.jsx';

const sorted = false;


function ProductList({products, userRole}) {
  console.log(products)
    const [filteredData, setFilteredData] = useState();
    const [isAll, setIsAll] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

    const categoryRef = useRef()

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = isAll ? 
      products.slice(indexOfFirstItem, indexOfLastItem) :
      filteredData.slice(indexOfFirstItem, indexOfLastItem);

      const paginate = pageNumber => setCurrentPage(pageNumber);

    const FilterHandler = (event) => {
        const selected =  categoryRef.current?.value;
        if (selected === "ALL") {
          setIsAll(true);
        } else {
          setIsAll(false);
          setFilteredData(
            products.filter((item) => item.category  === selected)
          );
        }
      };

      return (
<article className="product_list">
          <form className='product_list_form' >
            <label className='product_list_lable'>Category</label>
            <select
            className='product_list_select'
              ref={categoryRef}
              defaultValue="select"
              onChange={FilterHandler}
            >
              <option value="ALL">ALL</option>
              <option value="Art">Art</option>
              <option value="Sport">Sport</option>
              <option value="Fashion">Fashion</option>
              <option value="Kids">Kids</option>
              <option value="Home">Home</option>
              <option value="Tech">Tech</option>
            </select>
          </form>
            <main className='product_list_main'>
        {currentItems?.map((p, index) => (
          <Product key={index} product={p} />
        ))}
      </main>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={isAll ? products.length : filteredData.length}
        paginate={paginate}
      />
        </article>
      )}



export default ProductList;