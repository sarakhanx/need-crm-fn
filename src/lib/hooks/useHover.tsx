// useHoverHooks.ts
import React from "react";

const useHoverHooks = () => {
  const [isHovered, setIsHovered] = React.useState<any>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return [isHovered, handleMouseEnter, handleMouseLeave];
};

export default useHoverHooks;


//! the hook need to use by {ref} as parent div or any parent and onMouse<X> use   "handleMouseEnter, handleMouseLeave"
// eg : 
// const [isHovered, handleMouseEnter, handleMouseLeave] = useHoverHooks();
// return (
//     <aside
//       className={`flex flex-col justify-between h-screen bg-gray-900/50 transition-all ease-in-out duration-500 transform ${
//         isOpen ? "w-48" : ""
//       }`}
//       ref={ref}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >.....