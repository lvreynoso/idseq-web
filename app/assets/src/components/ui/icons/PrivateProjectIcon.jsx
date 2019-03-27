import React from "react";
import PropTypes from "prop-types";
import cs from "./project_icon.scss";

const PrivateProjectIcon = props => {
  return (
    <svg
      className={props.className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 38 38"
      style={{ enableBackground: "new 0 0 38 38" }}
      xmlSpace="preserve"
    >
      <g>
        <path
          className={cs.folder}
          d="M33.2,11.7c-0.2-0.3-0.5-0.5-0.8-0.7l0.1-0.7c0.2-1.8-1.1-3.4-2.9-3.5c-0.1,0-0.2,0-0.3,0H16.8
          c-0.3,0-0.6-0.1-0.8-0.4l-1-1.2C14.3,4.5,13.4,4,12.4,4H8.9C8,4,7.1,4.4,6.5,5.1C5.8,5.8,5.5,6.7,5.6,7.7L6,10.9
          c-0.4,0.2-0.8,0.4-1.2,0.8c-0.6,0.7-0.9,1.6-0.8,2.5l1.1,12.5C5.3,28.6,6.9,30,8.8,30h12.9c-0.1-0.4-0.1-0.8-0.1-1.2
          c0-0.3,0-0.7,0.1-1H8.8c-0.8,0-1.4-0.6-1.4-1.3L6.2,14c0-0.3,0.1-0.6,0.3-0.8c0.2-0.2,0.5-0.4,0.8-0.4h23.5c0.3,0,0.6,0.1,0.8,0.4
          c0.2,0.2,0.3,0.5,0.3,0.8l-0.7,7.6c0.8,0.2,1.5,0.6,2.1,1l0.8-8.4C34.1,13.3,33.8,12.4,33.2,11.7z M30.2,10.6h-22L7.8,7.4
          c0-0.3,0.1-0.6,0.3-0.8c0.2-0.2,0.5-0.4,0.8-0.4h3.5c0.3,0,0.6,0.1,0.8,0.4l1,1.2c0.6,0.8,1.5,1.2,2.5,1.2h12.4
          c0.3,0,0.6,0.1,0.8,0.3c0.2,0.2,0.3,0.5,0.3,0.8L30.2,10.6z"
        />
        <g>
          <path
            className={cs.decorator}
            d="M29,24.8c-1,0-1.8,0.8-1.8,1.8v0.9h3.5v-0.9C30.8,25.6,30,24.8,29,24.8z"
          />
          <path
            className={cs.decorator}
            d="M29,28.9c-0.4,0-0.6,0.3-0.6,0.6c0,0.2,0.1,0.4,0.3,0.6V31c0,0.2,0.1,0.3,0.3,0.3c0.2,0,0.3-0.1,0.3-0.3
            v-0.9c0.2-0.1,0.3-0.3,0.3-0.6C29.7,29.2,29.4,28.9,29,28.9z"
          />
          <path
            className={cs.decorator}
            d="M29,21.3c-4.1,0-7.5,3.4-7.5,7.5s3.4,7.5,7.5,7.5s7.5-3.4,7.5-7.5S33.2,21.3,29,21.3z M32.5,31.8
            c0,0.5-0.4,0.9-0.9,0.9h-5.2c-0.5,0-0.9-0.4-0.9-0.9v-3.5c0-0.5,0.4-0.9,0.9-0.9v-0.9c0-1.4,1.2-2.6,2.6-2.6
            c1.4,0,2.6,1.2,2.6,2.6v0.9c0.5,0,0.9,0.4,0.9,0.9V31.8z"
          />
        </g>
      </g>
    </svg>
  );
};

PrivateProjectIcon.propTypes = {
  className: PropTypes.string
};

export default PrivateProjectIcon;