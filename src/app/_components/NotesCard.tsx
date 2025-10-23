interface NoteCardProps {
  notes: string;
}

export function NoteCard({ notes }: NoteCardProps) {
  return (
    <div className="bg-[#2F3337] rounded-lg p-4 text-white w-full max-w-xs sm:max-w-sm md:max-w-md">
      {notes}
    </div>
  );
}
