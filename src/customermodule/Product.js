import "./Product.css";
import config from '../config'

const Product = ({ result }) => {
  return (
    <>
      <section className="card-container">{result}</section>
    </>
  );
};

export default Product;