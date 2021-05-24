import React, { useEffect, useState } from "react";

const Alert = ({ msg }) => {
  const [alert, setAlert] = useState(true);
  const { danger, info } = msg;
  const timeId = useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 1500);
    return () => {
      clearTimeout(timeId);
      setAlert(true);
    };
  }, [msg]);
  return info === ""
    ? null
    : alert && (
        <p className={`alert ${danger ? "alert-danger" : "alert-success"}`}>
          {info}
        </p>
      );
};

export default Alert;
