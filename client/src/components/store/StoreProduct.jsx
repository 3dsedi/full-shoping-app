import React from 'react'

const StoreProduct = (product) => {
    console.log(product.product.price)
  return (
    <>
    <article className={"product_item product"}>
        <section className={"text_section"}>
            <h3>
                 Title: {product.product.title}
            </h3>
        </section>
        <img src={product.product.imageUrl} alt={"picture of product"}/>
        <div>
        <h5>Quantity: {product.product.quantity}</h5>
        <h4>Price: ${product.product.price}</h4>

        </div>
    </article>
</>
  )
}

export default StoreProduct