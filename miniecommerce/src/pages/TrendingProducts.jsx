import React, { useState } from "react";
import ProductCards from "./ProductCards";
import Loading from '../components/Loading';
import { useFetchAllProdutsQuery } from '../redux/features/products/productsApi';
import CartModal from "./CartModal";
import { useSelector } from "react-redux";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };
  
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsData = {}, isLoading } = useFetchAllProdutsQuery({
    page: currentPage,
  });

  const { products: cartProducts } = useSelector(state => state.cart);

  if (isLoading) return <Loading />;

  const { products = [] } = productsData?.data || {};

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover the Hottest Picks: Elevate Your Style with Our Curated
        Collection of Trending Women's Fashion Products.
      </p>
      
      <div className="mt-8">
        <ProductCards 
          products={products.slice(0, visibleProducts)} 
          onCartOpen={() => setIsCartOpen(true)}
        />
      </div>
      
      {visibleProducts < products.length && (
        <div className="product__btn">
          <button onClick={loadMoreProducts} className="btn">
            Load More
          </button>
        </div>
      )}
      
      <CartModal 
        products={cartProducts}
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
    </section>
  );
};

export default TrendingProducts;