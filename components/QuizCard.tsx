interface QuizCardProps {
  title: string;
  excerpt: string;
  image: string;
}

export default function QuizCard({ title, excerpt, image }: QuizCardProps) {
  return (
    <div className="bg-white dark:bg-[#151515] border dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col cursor-pointer group/item">
      <div className="overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover group-hover/item:scale-105 transition duration-500" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 flex-1">{excerpt}</p>
      </div>
    </div>
  );
}