/* eslint-disable react/prop-types */
import "./RedMark.css";

function RedMark({mark}) {
  return (
    <p className="red-mark | fs-100 clr-primray-100" style={{ opacity: mark === true ? 0 : 1 }}>
      {mark === true ? false : mark}
    </p>
  );
}

export default RedMark;
