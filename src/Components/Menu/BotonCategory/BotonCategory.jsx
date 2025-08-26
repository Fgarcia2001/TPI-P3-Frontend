import "./BotonCategory.css";
const BotonCategory = ({ title, filterValue, id }) => {
  return (
    <button
      className="btnCat w-25 my-1 mx-1"
      onClick={() => {
        filterValue(parseInt(id));
      }}
    >
      {title}
    </button>
  );
};

export default BotonCategory;
