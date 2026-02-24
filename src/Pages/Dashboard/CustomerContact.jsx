import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxios";

const CustomerContact = () => {
  const axiosSecure = useAxiosSecure();
  const { data: contact = [], refetch } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/contact/${id}`);
      console.log("Deleted:", res.data);
      refetch();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl md:text 3xl text-center font-bold mt-5">
        Customer Message (
        <span className="text-amber-500">{contact.length}</span>)
      </h1>
      <title>Lunor | Customer Contact</title>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contact.map((data, index) => (
          <div
            key={data._id}
            className="bg-gray-50 p-5 rounded-xl border border-gray-400 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Serial Number */}
            <span className="text-gray-500 font-bold mr-2">{index + 1}.</span>

            {/* Name */}
            <h1 className="text-xl font-semibold text-gray-800">{data.name}</h1>

            {/* Email & Number */}
            <p className="text-gray-700">Email : {data.email}</p>
            <p className="text-yellow-900">Phone : {data.number}</p>
            <p className="text-amber-600">Message : {data.message}</p>

            {/* delete button */}
            <button
              onClick={() => handleDelete(data._id)}
              className="btn bg-red-500 mt-2 border-red-200"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerContact;
