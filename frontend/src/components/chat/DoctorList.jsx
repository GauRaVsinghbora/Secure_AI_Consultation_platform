import { CiStar } from "react-icons/ci";

function DoctorList({ doctors }) {
  return (
    <div className="w-full mt-3 space-y-3">
      {doctors.map((doc, index) => (
        <div
          key={index}
          className="
            bg-[#111111] 
            p-4 
            rounded-2xl 
            border border-white/10 
            hover:border-white/30 
            transition-all duration-200 
            cursor-pointer 
            hover:bg-[#1a1a1a] 
            hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]
          "
          onClick={() => {
            alert(
              `${doc.name}\n${doc.address}\nRating: ${doc.rating || "N/A"}\nSpecialty: ${doc.specialty || "General Physician"}\n\nPlease contact clinic directly for appointment.`
            );
          }}
        >
          {/* Top Row */}
          <div className="flex justify-between items-start mb-2 gap-2">
            
            {/* LEFT: Name */}
            <h3 className="text-white font-semibold text-[15px] flex gap-2 flex-1 min-w-0">
              
              <svg className="w-4 h-4 text-white/70 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>

              <span className="break-words line-clamp-2">
                {doc.name}
              </span>
            </h3>

            {/* RIGHT: Rating */}
            <p className="text-white/70 text-sm font-medium flex items-center gap-1 shrink-0">
              <CiStar />
              {doc.rating || "N/A"}
            </p>

          </div>

          {/* Address */}
          <p className="text-white/50 text-sm mb-2 leading-relaxed">
            {doc.address}
          </p>

          {/* Specialty */}
          {doc.specialty && (
            <p className="text-white/60 text-xs flex items-center gap-1 mt-1">
              <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              {doc.specialty}
            </p>
          )}

          {/* Footer */}
          <div className="mt-3 pt-2 border-t border-white/10">
            <span className="text-white/40 text-xs flex items-center gap-1 hover:text-white/80 transition">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              View contact details
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorList;