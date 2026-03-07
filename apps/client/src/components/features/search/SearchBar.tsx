import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="text-muted-foreground bg-background ring-muted-foreground flex items-center gap-2 rounded-md px-2 py-1 shadow ring-1">
      <Search className="mr-2 size-4 shrink-0" />
      <input id="search" placeholder="Пошук..." className="" />
    </div>
  );
};

export default SearchBar;
