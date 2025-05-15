"use client";
import { useState, useRef, useEffect } from "react";
import { stories } from "@/lib/stories";
import { Search } from "lucide-react";

export default function NavSearchBar() {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter stories by title or author
  const filteredStories = search.trim()
    ? stories.filter(
        (story) =>
          story.title.toLowerCase().includes(search.toLowerCase()) ||
          story.author.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Hide dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
        setExpanded(false);
      }
    }
    if (showDropdown || expanded) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown, expanded]);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        aria-label="Open search"
        className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${expanded ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
        onClick={() => {
          setExpanded((prev) => !prev);
          setShowDropdown(true);
        }}
      >
        <Search className="w-5 h-5" />
      </button>
      <form
        className={`relative transition-all duration-200 overflow-visible ${expanded ? 'w-56 ml-2 opacity-100' : 'w-0 opacity-0'} flex-shrink-0`}
        onSubmit={e => e.preventDefault()}
        autoComplete="off"
        style={{ position: 'relative' }}
      >
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search by title or author..."
          className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          style={{ minWidth: 0 }}
        />
        {(showDropdown && search.trim()) && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg max-h-60 overflow-y-auto z-30"
            style={{ display: expanded ? 'block' : 'none' }}
          >
            {filteredStories.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">No results</div>
            ) : (
              filteredStories.map(story => (
                <a
                  key={story.id}
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    setExpanded(false);
                    setSearch("");
                  }}
                >
                  <span className="font-semibold">{story.title}</span>
                  <span className="ml-2 text-sm text-gray-500">by {story.author}</span>
                </a>
              ))
            )}
          </div>
        )}
      </form>
    </div>
  );
}
