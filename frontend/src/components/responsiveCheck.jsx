// import { useState, useEffect } from "react";

// export default function WidthBelow1024px() {
//   const [isTablet, setIsTablet] = useState(false);

//   useEffect(() => {
//     function handleResize() {
//       const width = window.innerWidth;
//     //   setIsTablet(width >= 768 && width <= 1024);
//     //   console.log("Working")
//       console.log("Working")
//       setIsTablet(width <= 1024);
//     }

//     // Run on mount
//     handleResize();

//     // Listen for window resizes
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

// //   return <div>{isTablet ? "Tablet detected 📱💻" : "Not a tablet"}</div>;
//   return {isTablet ? true : false};
// }


import { useState, useEffect } from "react";

export default function useWidthBelow1024() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    function handleResize() {
      console.log("resizeerrrr")
      const width = window.innerWidth;
      setIsTablet(width <= 1024); // true if width is <= 1024px
    }

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTablet;
}
