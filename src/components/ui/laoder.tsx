export function BounceLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-white">
      <div className="relative w-32 h-32 ">
        <style>{`
          @keyframes pulse-grow {
            0%, 100% {
              transform: scale(0.2);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.4;
            }
          }
          
          @keyframes pulse-shrink {
            0%, 100% {
              transform: scale(1.5);
              opacity: 0.4;
            }
            50% {
              transform: scale(0.8);
              opacity: 0.6;
            }
          }
          
          .circle-1 {
            animation: pulse-grow 1.7s ease-in-out infinite;
          }
          
          .circle-2 {
            animation: pulse-shrink 1.7s ease-in-out infinite;
          }
        `}</style>
        {/* First circle */}
        <div className="circle-1 size-13 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
        {/* Second circle overlapping */}
        <div className="circle-2 size-13 bg-pink-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
      </div>
    </div>
  );
}
