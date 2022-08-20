import '../styles/product.css';


const Product = ({ sku, name, price, type }) => {

    return <div className="prod">
        <input type="checkbox" />
        <div className="text">
            <p>{sku}</p>
            <p>{name}</p>
            <p>{price}</p>
            <p>{type}</p>
        </div>
    </div>

}

export default Product;