export default function CTASection() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage: "radial-gradient(white 2px, transparent 2px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Dive into the Codebase.
          </h2>
          <p className="text-xl md:text-2xl font-medium mb-10 opacity-90">
            Check out the repository, read the documentation, and contribute.
          </p>
          <button className="bg-white text-primary text-xl font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform">
            View on GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
