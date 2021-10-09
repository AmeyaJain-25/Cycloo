import { useEffect, useState } from "react";
import { ReactComponent as StarIcon } from "../../assets/star-icon.svg";
import "./starrating.scss";

const StarRating = ({ ratingCount = 0, disabled = false, style }) => {
  const [starsArr, setStarsArr] = useState(Array(5).fill(0));

  useEffect(() => {
    if (ratingCount > 5) {
      setStarsArr(Array(5).fill(1));
    } else {
      setStarsArr(Array(5).fill(0).fill(1, 0, ratingCount));
    }
  }, [ratingCount]);

  return (
    <div className="star-rating-div" style={style}>
      {starsArr.map((star, index) =>
        star === 1 ? (
          disabled ? (
            <StarIcon key={index} className="star-disabled" />
          ) : (
            <StarIcon key={index} className="star-filled" />
          )
        ) : (
          <StarIcon key={index} className="star-empty" />
        )
      )}
    </div>
  );
};

export default StarRating;
