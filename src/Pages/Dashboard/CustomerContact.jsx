import { useQuery } from "@tanstack/react-query";
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
    <div className="px-4 py-8 md:px-8">
      <title>Lunor | Customer Contact</title>

      {/* Header */}
      <div className=" mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em mb-2">
              Lunor Administration
            </p>

            <h1 className="text-2xl md:text-3xl font-bold uppercase">
              Customer Messages
            </h1>

            <p className="text-sm mt-2">
              Manage and review messages from your customers.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black border border-gray-200 rounded px-5 py-2.5 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Total Messages -
            </span>
            <span className="text-xl text-gray-900 dark:text-white">
              {contact.length}
            </span>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {contact.map((data, index) => (
          <div
            key={data._id}
            className="group border border-gray-200 rounded p-4 md:p-6"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-white font-bold text-lg">
                  {data.name?.charAt(0)?.toUpperCase() || "C"}
                </div>

                <div className="min-w-0">
                  <h2 className="text-base font-bold truncate">{data.name}</h2>
                  <p className="text-xs">Customer #{index + 1}</p>
                </div>
              </div>

              <span className="shrink-0 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 px-3 py-1.5 rounded-full">
                #{index + 1}
              </span>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 border-y border-gray-100 dark:border-gray-800 py-4">
              <div className="flex items-start gap-3">
                <span className="text-sm mt-0.5">✉</span>
                <p className="text-sm break-all">{data.email}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm">☎</span>
                <p className="text-sm">{data.number}</p>
              </div>
            </div>

            {/* Message */}
            <div className="mt-4">
              <p className="text-xs font-bold uppercase tracking-wider mb-2">
                Message
              </p>

              <p className="text-sm leading-6 whitespace-pre-wrap break-words">
                {data.message}
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(data._id)}
              className="w-full mt-6 py-2.5 rounded border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
            >
              Delete Message
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {contact.length === 0 && (
        <div className="max-w-md mx-auto text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center mx-auto mb-5 text-2xl text-gray-400">
            ✉
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            No Messages Yet
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Customer messages will appear here when someone contacts you.
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerContact;
