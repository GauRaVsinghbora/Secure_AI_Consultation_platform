function DoctorList({ doctors }) {
  return (
    <div className="w-full mt-2 space-y-2">
      {doctors.map((doc, index) => (
        <div
          key={index}
          className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-700 hover:border-gray-500 transition"
        >
          <h3 className="text-white font-semibold">
            {doc.name}
          </h3>

          <p className="text-gray-400 text-sm">
            📍 {doc.address}
          </p>

          <p className="text-yellow-400 text-sm">
            ⭐ {doc.rating || "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DoctorList;