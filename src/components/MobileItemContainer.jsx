function MobileItemContainer({ item }) {
  return (
    <div className="flex items-center flex-1 ">
      <div className="flex flex-row w-full gap-x-3">
        <div className="w-16">
          <img
            src={item.imgUrl}
            // alt={item.name}
            className="w-full h-full rounded-md aspect-auto "
          />
        </div>

        <div className="flex flex-col justify-between  p-1 w-[80%]">
          <div className="pt-0.5 ">
            <p className="pb-1 text-xs font-bold border-b w-[90%] md:text-sm border-coffee-dark/40 ">
              {item.name}
            </p>
          </div>

          <p className="w-full py-3 text-xs text-gray-500 ">
            {item.description}
          </p>

          <p className="text-xs text-red-900 md:text-sm w-fit">
            {item.price} تومان
          </p>
        </div>
      </div>
    </div>
  );
}

export default MobileItemContainer;
