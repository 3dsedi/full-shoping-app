import React, { useRef, useState } from "react";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "./AddProductForm.css";

const AddProduct = ({ storeData, addProduct }) => {
  console.log(storeData);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const imgRef = useRef();
  const priceRef = useRef();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  const productSubmitHandler = async (event) => {
    event.preventDefault();

    if (imgRef.current?.files?.length) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataURL = e.target?.result;
        const productData = {
          storeId: storeData[0].storeId,
          imageUrl: dataURL,
          title: titleRef.current?.value,
          description: descriptionRef.current?.value,
          quantity: selectedQuantity,
          category: selectedCategory,
          price: priceRef.current?.value,
        };
        console.log(productData);
        addProduct(productData);

        titleRef.current.value = "";
        descriptionRef.current.value = "";
        imgRef.current.value = "";
        priceRef.current.value = "";
        setSelectedCategory("");
        setSelectedQuantity(1);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
     <button onClick={handleGoBack} className="back_button"><FaArrowLeft /></button>
      <p className="new_product_p">Create new product</p>
      <form onSubmit={productSubmitHandler} className="create_product_form">
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          <option value="Art">Art</option>
          <option value="Sport">Sport</option>
          <option value="Fashion">Fashion</option>
          <option value="Kids">Kids</option>
          <option value="Home">Home</option>
          <option value="Tech">Tech</option>
        </select>
        <input placeholder={"Title"} id={"title_input"} ref={titleRef} />
        <br />
        <textarea
          placeholder={"Description"}
          id={"description_input"}
          ref={descriptionRef}
        ></textarea>
        <br />
        <input
          type="number"
          placeholder={"Price"}
          id={"price_input"}
          ref={priceRef}
        />
        <br />
        <label htmlFor="quantity_input" className="product_quantity">
          Quantity
        </label>
        <input
          className="product_quantity"
          type="range"
          min="1"
          max="100"
          step="1"
          value={selectedQuantity}
          onChange={handleQuantityChange}
          id={"quantity_input"}
        />
        <span>{selectedQuantity}</span>
        <br />
        <label className="product_img_upload" htmlFor="img">
          Add Image
        </label>
        <input className="form__input" type="file" id="img" ref={imgRef} />
        <button className="submit">Add</button>
      </form>
    </>
  );
};

export default AddProduct;
