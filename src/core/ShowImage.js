import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        minHeight: "200px",
        maxHeight: "200px"
      }}
    />
  </div>
);

export default ShowImage;
