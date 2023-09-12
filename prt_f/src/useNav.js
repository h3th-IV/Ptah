import { useEffect } from "react";
import { useState } from "react";

const useNav = (value) => {
  const [navValue, setNavValue] = useState(true);

  useEffect(() => {
    setNavValue(value);
  }, []);

  return { navValue };
};

export default useNav;
