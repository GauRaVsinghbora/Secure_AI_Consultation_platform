export default function About() {
  return (
    <div className="min-h-screen  text-black px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <div className="mt-9">
          <h1 className="text-4xl font-bold text-center mb-6">
            About MedChat AI
          </h1>

          {/* Intro */}
          <p className="text-lg text-black-400 text-center mb-18 px-[200px]">
            MedChat AI is an intelligent healthcare chatbot designed to provide
            quick, reliable, and accessible medical information to everyone.
            Our goal is to bridge the gap between people and basic medical
            guidance using Artificial Intelligence.
          </p>

          {/* Mission */}
          <div className="max-full mx-auto space-y-8">

                {/* Card */}
                <div className="group relative overflow-hidden border border-gray-700 rounded-[50px]  p-6 transition-all duration-500">

                  {/* Water fill layer */}
                  <div className="absolute bottom-0 left-0 w-full h-0 bg-black transition-all duration-500 group-hover:h-full"></div>

                  {/* Content */}
                  <div className="relative z-10 transition-colors duration-500 group-hover:text-white">

                    <div className="mb-10">
                      <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
                      <p className="text-gray-400 group-hover:text-gray-200 leading-relaxed transition-colors duration-500">
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
                      <h2 className="text-2xl font-semibold mb-3">The Problem We Address</h2>
                      <p className="text-gray-400 group-hover:text-gray-200 leading-relaxed transition-colors duration-500">
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
        <div className="mt-[10rem] mb-25 px-[200px]">
          <h2 className="text-5xl  font-semibold mb-6">Methods</h2>
          <p className="text-gray-400 leading-relaxed">
            MedChat AI uses advanced Natural Language Processing (NLP) and
            Large Language Models (LLMs) to understand user queries and
            generate helpful medical guidance. The system processes user
            input, generates AI responses, and securely stores conversation
            data to improve future interactions.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-black p-6 py-9 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-2 text-white">
            Medical Disclaimer
          </h2>
          <p className="text-gray-400">
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