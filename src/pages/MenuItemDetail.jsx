import { useNavigate, useParams } from "react-router-dom";
import { useMenuItem } from "../hooks/useMenuItems";
import Modal from "../components/Modal";

function MenuItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, isLoading, error } = useMenuItem(Number(id));

  // Loading state
  if (isLoading)
    return (
      <Modal isOpen={true} onClose={() => navigate("/menu")}>
        <p className="py-8 text-center">درحال بارگذاری ...</p>
      </Modal>
    );

  // Error state
  if (error)
    return (
      <Modal isOpen={true} onClose={() => navigate("/menu")}>
        <p className="py-8 text-center">خطا در بارگذاری اطلاعات</p>
      </Modal>
    );

  return (
    <Modal isOpen={true} onClose={() => navigate("/menu")}>
      {item && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold">{item.name}</h2>
          <img src={item.imgUrl} alt={item.name} className="w-32 rounded-lg" />
          <p>{item.description}</p>
          <p className="font-bold">{item.price} تومان</p>
        </div>
      )}
    </Modal>
  );
}

export default MenuItemDetail;
