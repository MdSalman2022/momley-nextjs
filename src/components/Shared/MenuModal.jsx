const MenuModal = ({ isMenuModalOpen, setIsMenuModalOpen, children }) => {
  if (isMenuModalOpen === true) {
    return (
      <div>
        <div className="absolute top-16 right-5 lg:right-60 w-full z-50 block ">
          <div
            onClick={() => setIsMenuModalOpen(false)}
            className="h-screen  absolute top-0 w-full"
          ></div>
          <div className="flex items-start justify-end min-h-screen w-full">
            <div className="relative bg-primary dark:bg-base-100 rounded overflow-hidden drop-shadow-xl transform transition-all sm:w-fit  flex flex-wrap h-full z-50">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MenuModal;
