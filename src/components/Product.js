import '../styles/product.css';

//price must be float
const Product = ({ sku, name, price, type, handleCheck, isChecked }) => {

    return <div className="prod">
        <input type="checkbox"
            checked={isChecked}
            onChange={handleCheck}
            className="delete-checkbox" />
        <div className="text">
            <p>{sku}</p>
            <p>{name}</p>
            <p>{price.toFixed(2)} $</p>
            <p>{type}</p>
        </div>
    </div>

}

export default Product;