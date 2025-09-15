import Image from "next/image";

export const MinisterCard = ({ item, onClick }: { item: GreetingItem; onClick: () => void }) => {
   // --- Logic to split the position string ---
  const positionWords = item.position.split(' ');
  const wordsOnFirstLine = 2; // <--- You can change this number (e.g., 2 or 4)

  // Check if the string needs to be split
  const requiresSplitting = positionWords.length > wordsOnFirstLine;

  // Create the two lines
  const line1 = requiresSplitting
    ? positionWords.slice(0, wordsOnFirstLine).join(' ')
    : item.position;
  
  const line2 = requiresSplitting
    ? positionWords.slice(wordsOnFirstLine).join(' ')
    : null; // line2 is null if no split is needed
  // --- End of logic ---

  return (
    <div
      className="relative cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      {/* Image fills the entire card */}
      <Image
        src={item.coverImageUrl}
        alt={`Portrait of ${item.name}`}
        className="w-full h-full object-cover aspect-[2.8/4]"
        width={800}
        height={1067}
        loading="lazy"
      />
      {/* Absolute positioned overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#F37032] text-white ">
        <p className="font-bold font-sans text-2xl  leading-tight">{item.name}</p>
        
        {/* Display the position text */}
        <div className="text-sm font-light mt-4">
          <span>{line1}</span>
          {/* Only show the second line if it exists */}
          {line2 && (
            <>
              <br />
              <span>{line2}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
  };