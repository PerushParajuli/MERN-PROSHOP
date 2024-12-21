import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { useGetProductsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Pagination";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  // the below code is done to fetch the data from the backend
  // const [products, setProduct] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get(`/api/products`);
  //     setProduct(data);
  //   };

  //   fetchProducts();
  // }, []);

  //now we are fetching the data using apiSlicing
  //we get some things from useGetProductQuery, they are data,isLoading,isError
  const { pageNumber, keyword } = useParams();
  const {
    data,
    isLoading,
    isError: error,
  } = useGetProductsQuery({ keyword, pageNumber });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((pro) => (
              <Col key={pro._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={pro} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
