import PropTypes from "prop-types";
import "./index.css";

const CensorshipInfoCard = ({ count, name }) => (
  <div className="csic-container">
    <h2>{name}</h2>
    <div>{count.toLocaleString()} Measurements</div>
  </div>
);

CensorshipInfoCard.propTypes = {
  alpha_2: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default CensorshipInfoCard;
