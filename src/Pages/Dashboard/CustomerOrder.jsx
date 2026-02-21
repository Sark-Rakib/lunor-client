import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxios";
import OrderCard from "../../Component/OrderCard";
import Swal from "sweetalert2";
import Loading from "../../Component/Loading";

const CustomerOrder = () => {
  const axiosSecure = useAxiosSecure();

  //  get orders
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  // delete order
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/orders/${id}`);
    },
    onSuccess: () => {
      refetch();
      Swal.fire("Deleted!", "Order has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete order.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <p className="text-center py-10">
        <Loading></Loading>
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <title>Lunor | Customer Order</title>
      <h1 className="font-bold text-xl text-center mb-5 py-5">
        Customer Orders :{" "}
        <span className="text-amber-500">{orders.length}</span>
      </h1>

      {orders.length === 0 && (
        <p className="text-center text-gray-500">No orders found</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="relative">
            <OrderCard order={order} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrder;
