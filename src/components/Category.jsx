import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, setCategoryId } from "../store/category";
import { getAllProducts } from "../store/product";

const Category = () => {
  const categories = useSelector((state) => state.category.categories);
  const selectedId = useSelector((state) => state.category.selectedId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const selectCategory = (id) => {
    dispatch(getAllProducts({ catId: id }));
    dispatch(setCategoryId(id))
  };

  const getListClass = (id) => {
    return id === selectedId
      ? "bg-warning border-warning list-group-item active"
      : "list-group-item";
  };
  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      {categories.map((category) => (
        <li
          key={category._id}
          className={getListClass(category._id)}
          onClick={() => selectCategory(category._id)}
        >
          {category.title}
        </li>
      ))}
    </ul>
  );
};

export default Category;
