import './FilterStyles.css';

const PriceFilter = () => {

  return (
    <>
     <div className="price-filter">
        <h4>PRICE</h4>
        <div className="price-filter-select">
        <select defaultValue="500">
          <option disabled value="500">Min</option>
          <option value="500">₹500</option>
          <option value="1000">₹1000</option>
          <option value="1500">₹1500</option>
          <option value="2000">₹2000</option>
          <option value="2500">₹2500</option>
        </select>
        <span>to</span>
        <select defaultValue="500">
          <option value="500">₹500</option>
          <option value="1000">₹1000</option>
          <option value="1500">₹15000</option>
          <option value="2000">₹2000</option>
          <option value="2500">₹2500</option>
          <option value="3000">₹3000+</option>
        </select>
        </div>
     </div>
    </>
  )
}

export default PriceFilter