interface RatingBadgeProps {
  rating: string | undefined;
}

export const RatingBadge = ({ rating }: RatingBadgeProps) => {

  if (!rating || rating === 'N/A') return null;

  const numRating = parseFloat(rating);
  if (isNaN(numRating)) return null;

  let colorClasses = "bg-green-500/10 text-green-500 border-green-500/20"; // 8 a 10
  
  if (numRating < 5.0) {
    colorClasses = "bg-red-500/10 text-red-500 border-red-500/20"; // 1 a 4.9
  } else if (numRating < 8.0) {
    colorClasses = "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"; // 5 a 7.9
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-gray-500">•</span>
      <span className={`px-1.5 py-0.5 rounded-md font-bold border ${colorClasses}`}>
        IMDb {rating}
      </span>
    </div>
  );
};