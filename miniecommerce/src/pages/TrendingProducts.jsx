import React, { useState } from "react";
import ProductCards from "./ProductCards";
import Loading from '../components/Loading'
import { useFetchAllProdutsQuery } from '../redux/features/products/productsApi'

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const loadMoreProducts = () => {
    setVisibleProducts((prvCount) => prvCount + 4);
  };
  const [currentPage, setCurrentPage] = useState(1)
  const {data:productsData={},error,isLoading} = useFetchAllProdutsQuery({
    
    
    page: currentPage,
    

  })
  console.log(productsData?.data)

  //loading
  if(isLoading) return <Loading/>

  const {products,totalPages,totalProducts} =  productsData?.data || {}

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover the Hottest Picks: Elevate Your Style with Our Curated
        Collection of Trending Women's Fashion Products.
      </p>
      {/* products cards */}
      <div className="mt-8">
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>
      {/* load more button */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button onClick={loadMoreProducts} className="btn">
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;