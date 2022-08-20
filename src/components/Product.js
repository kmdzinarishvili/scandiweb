import '../styles/product.css';


const Product = ({ sku, name, price, type, handleCheck, isChecked }) => {

    return <div className="prod">
        <input type="checkbox"
            checked={isChecked}
            onChange={handleCheck} />
        <div className="text">
            <p>{sku}</p>
            <p>{name}</p>
            <p>{price}</p>
            <p>{type}</p>
        </div>
    </div>

}

export default Product;