import { useEffect } from "react";
import { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(false);

  useEffect(() => {
    if(text.length > 105){
        setIsReadMore(true)
      }
  }, [text])


  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };


  return (
    <p>
      {isReadMore ? text.slice(0, 100) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

export default ReadMore


