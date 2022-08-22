import '../styles/product.css';

//price must be float
const Product = ({ item, handleCheck }) => {
    const { sku, name, price, type } = item;
    return <div className="prod">
        <input type="checkbox"
            onChange={handleCheck}
            className="delete-checkbox" />
        <div className="text">
            <p>{sku}</p>
            <p>{name}</p>
            <p>{price.toFixed(2)} $</p>
            {type === "dvd" ?
                <p>Size: {item["size"]} MB</p> :
                type === "book" ?
                    <p>Weight {item["weight"]} KG</p> :
                    <p>Dimension {item["length"]}x{item["width"]}x{item["height"]} KG</p>}
        </div>
    </div>

}

export default Product;