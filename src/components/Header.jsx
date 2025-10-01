// src/components/Header.jsx
const Header = ({ title, image, children }) => {
  return (
    <header className="page__header">
      <div className="page__header-container">
        {image && (
          <div className="page__header-image">
            <img src={image} alt={title} />
          </div>
        )}
        <div className="page__header-content">
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </header>
  );
};
export default Header;
