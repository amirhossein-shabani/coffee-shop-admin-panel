function WindowsItemContainer({ item }) {
  return (
    <div className="flex items-center flex-1 ">
      <div className="flex flex-row w-1/2 px-0 gap-x-3">
        <div className="flex self-center h-20 w-28">
          <img
            src={item.imgUrl}
            // alt={item.name}
            className="w-full rounded-md aspect-auto"
          />
        </div>

        <div className="flex flex-col justify-between w-full pt-0.5 gap-1 py-1">
          <p className="text-sm md:text-sm">{item.name}</p>
          <p className="text-sm text-red-900 md:text-sm w-fit">
            {item.price} تومان
          </p>
        </div>
      </div>

      <div className="flex w-[90%] self-start justify-start h-full py-1.5 px-2 pr-4">
        <p className="flex text-xs text-gray-500 ">{item.description}</p>
      </div>
    </div>
  );
}

export default WindowsItemContainer;
