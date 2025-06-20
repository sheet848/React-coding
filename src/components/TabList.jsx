import React, { useState, useRef } from 'react'

const tabs = [
  { id: "tab1", label: "Home", content: "Welcome to Home tab content." },
  { id: "tab2", label: "Profile", content: "User Profile details here." },
  { id: "tab3", label: "Settings", content: "Settings content goes here." },
];

const TabList = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const tabsRef = useRef([]);

    const focusTab = (index) => {
    tabsRef.current[index]?.focus();
  };

  const onKeyDown = (e) => {
    let newIndex = activeIndex;
    if (e.key === "ArrowRight") {
      newIndex = (activeIndex + 1) % tabs.length;
      setActiveIndex(newIndex);
      focusTab(newIndex);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      setActiveIndex(newIndex);
      focusTab(newIndex);
      e.preventDefault();
    }
  };

  return (
    <>
    <div>
      <div role="tablist" style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={tab.id}
            role="tab"
            tabIndex={activeIndex === index ? 0 : -1}
            ref={(el) => (tabsRef.current[index] = el)}
            onClick={() => setActiveIndex(index)}
            onKeyDown={onKeyDown}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              border: "none",
              borderBottom: activeIndex === index ? "3px solid blue" : "3px solid transparent",
              outline: "none",
              background: "none",
              fontWeight: activeIndex === index ? "bold" : "normal",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) =>
        activeIndex === index ? (
          <div
            key={`panel-${tab.id}`}
            id={`panel-${tab.id}`}
            role="tabpanel"
            tabIndex={0}
            style={{ padding: 16 }}
          >
            {tab.content}
          </div>
        ) : null
      )}
    </div>
    </>
  )
}

export default TabList