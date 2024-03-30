import Nav from "../../components/Nav";
import { useParams } from "react-router-dom";
const ProductsPage = () => {
  const { productId } = useParams(); // Access ID from route params

  return (
    <div>
      <Nav />
      <h2>Product Detail</h2>
    </div>
  );
};

export default ProductsPage;
