export default function About() {
  return (
    <div className="min-h-screen text-black px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-14 md:py-16">
      
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <div className="mt-6 sm:mt-9">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
            About MedChat AI
          </h1>

          {/* Intro */}
          <p className="text-sm sm:text-base md:text-lg text-center mb-10 sm:mb-14 md:mb-16 
                        px-0 sm:px-6 md:px-16 lg:px-32 text-gray-700">
            MedChat AI is an intelligent healthcare chatbot designed to provide
            quick, reliable, and accessible medical information to everyone.
            Our goal is to bridge the gap between people and basic medical
            guidance using Artificial Intelligence.
          </p>

          {/* Mission */}
          <div className="w-full mx-auto space-y-6 sm:space-y-8">

            <div className="group relative overflow-hidden border border-gray-700 rounded-2xl sm:rounded-[40px] p-4 sm:p-6 transition-all duration-500">

              {/* Water fill layer */}
              <div className="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-500 group-hover:h-full"></div>

              {/* Content */}
              <div className="relative z-10 transition-colors duration-500 group-hover:text-white">

                {/* Mission */}
                <div className="mb-6 sm:mb-10">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
                    Our Mission
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 group-hover:text-gray-200 leading-relaxed transition-colors duration-500">
                    Millions of people search online every day for medical advice,
                    symptoms, and health guidance. However, access to healthcare
                    professionals is still limited in many parts of the world.
                    MedChat AI aims to provide instant medical guidance, helping
                    users understand symptoms and possible health conditions while
                    encouraging professional consultation when needed.
                  </p>
                </div>

                {/* Problem */}
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">
                    The Problem We Address
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 group-hover:text-gray-200 leading-relaxed transition-colors duration-500">
                    According to global healthcare reports, the world may face a
                    shortage of nearly 10 million healthcare workers by 2030.
                    During health crises such as the COVID-19 pandemic, millions of
                    people relied on the internet for medical information.
                    Unfortunately, much of this information can be unreliable.
                    MedChat AI helps provide structured, AI-driven responses to
                    common medical queries.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Technology */}
        <div className="mt-16 sm:mt-20 md:mt-32 mb-12 sm:mb-20 
                        px-0 sm:px-6 md:px-16 lg:px-32">
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-4 sm:mb-6">
            Methods
          </h2>

          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            MedChat AI uses advanced Natural Language Processing (NLP) and
            Large Language Models (LLMs) to understand user queries and
            generate helpful medical guidance. The system processes user
            input, generates AI responses, and securely stores conversation
            data to improve future interactions.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-black p-4 sm:p-6 md:p-8 rounded-xl border border-gray-800">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white">
            Medical Disclaimer
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            MedChat AI is designed to provide informational guidance only.
            It does not replace professional medical advice, diagnosis, or
            treatment. Always consult a qualified healthcare professional
            for medical concerns.
          </p>
        </div>

      </div>
    </div>
  );
}