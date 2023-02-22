import React from 'react'

const StoreProduct = (product) => {
    console.log(product.product.price)
  return (
    <>
    <article className={"product_item product"}>
        <section className={"text_section"}>
            <h3>
                {product.product.title}
            </h3>
        </section>
        <img src={product.product.imageUrl} alt={"picture of product"}/>
        <div>
        <h5>{product.product.quantity}</h5>
        <h4>{product.product.price}</h4>

        </div>
    </article>
</>
  )
}

export default StoreProduct