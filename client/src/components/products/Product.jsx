import './Product.css'

function Product({product, addToCart, userData}) {
    const productId = product.productId
    const userId = userData.id
    return (
        <>
            <article className={"product_item product"}>
                <section className={"text_section"}>
                    <h3>
                        {product.title}
                    </h3>
                </section>
                <img src={product.imageUrl} alt={"picture of product"}/>
                <button onClick={() => addToCart(userId, productId)}>Add to Cart</button>
            </article>
        </>
    )
}

export default Product;