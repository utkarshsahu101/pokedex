import React from "react";

const Header = () => {
  return (
    <div class="flex justify-between items-center py-4 bg-blue-900">
      <div class="flex-shrink-0 ml-10 cursor-pointer">
        <i class="fas fa-drafting-compass fa-2x text-orange-500"></i>
        <span class="ml-1 text-3xl text-blue-200 font-semibold">Pokedex</span>
      </div>
    </div>
  );
};

export default Header;
