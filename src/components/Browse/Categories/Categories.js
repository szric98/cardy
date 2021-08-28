const Categories = ({ categories, categoryFilter, setCategoryFilter }) => {
  return (
    <div id="categories">
      <span id="categories-title">Language</span>
      <div
        onClick={() => setCategoryFilter('')}
        style={{ cursor: 'pointer' }}
        className={!categoryFilter ? 'active-category' : ''}
      >
        <span className="material-icons-outlined">menu</span>
        <span>All Categories</span>
      </div>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={(e) => setCategoryFilter(e.target.innerText)}
            className={category === categoryFilter ? 'active-category' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;