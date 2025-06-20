import React, { useMemo, useRef, useState } from 'react'

const suggestionsList = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grapes",
  "Guava",
];

const Typeahead = () => {

    const [query, setQuery] = useState("");
    //const [highlightedIndex, sethighlightedIndex] = useState(-1);
    const inputRef = useRef();

    const filteredSuggestions = useMemo(() => {
        if(!query) return [];
        return suggestionsList.filter((item) => item.toLocaleLowerCase().startsWith(query.toLowerCase()));
    }, [query]);

  return (
    <>
    <div>
        <input type="text" placeholder='Search fruit...'
            value={query}
            ref={inputRef}
            onChange={(e) => {
                setQuery(e.target.value);
            }}
        />
        <ul>
            {
                filteredSuggestions.map((item, index) => (
                    <li key={item}
                        onMouseDown={() => {
                            setQuery(item);
                        }}>{item}</li>
                ))
            }
        </ul>
    </div>
    </>
  )
}

export default Typeahead