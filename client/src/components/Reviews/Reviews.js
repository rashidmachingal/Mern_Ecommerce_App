import { Avatar, Rating } from '@mui/material'
import { useState } from 'react';
import ReadMore from './ReadMore';
import './Reviews.css'

const Reviews = () => {
  const [value, setValue] = useState(0);

  function avatarColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);
  
    return color;
  }

  return (
    <div className='reviews-container'>
      <h2>Product Reviews</h2>
      <form className="review-form">
        <div className="review-rating">
          <h4>Rate This Product</h4>
          <Rating name="simple-controlled" value={value} onChange={(event, newValue) => setValue(newValue)}/>
        </div>
        <textarea placeholder='Enter Your Review...' ></textarea>
        <input type="submit" />
      </form>

      <div className="user-reviews">
        <div div className="user-review-box">
          <div className='ur-pro-rate-date' >
            <Avatar style={{backgroundColor:`${avatarColor()}`}} >R</Avatar>
            <div>
              <h5>Rashid M</h5>
             <Rating size='small' value={3}  readOnly />
            </div>
            <div>Jun 12 2022</div>
          </div>
          <div className='user-review-para' >
            <ReadMore>
              I purchased this product very useful and super cool! I realy
              reccomended this product for you. Main thing is the delivery 
              of this product is super
            </ReadMore>
          </div>
        </div>
        <div div className="user-review-box">
          <div className='ur-pro-rate-date' >
            <Avatar style={{backgroundColor:`${avatarColor()}`}} >R</Avatar>
            <div>
              <h5>John Doe</h5>
             <Rating size='small' value={3}  readOnly />
            </div>
            <div>Aug 04 2021</div>
          </div>
          <div className='user-review-para' >
            <ReadMore>
              I realy reccomend this product beacuse this product very cool!
            </ReadMore>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews