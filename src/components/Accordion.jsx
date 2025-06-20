import React, { useRef, useState } from 'react'

const items = [
  { id: "panel1", title: "Section 1", content: "Content for section 1." },
  { id: "panel2", title: "Section 2", content: "Content for section 2." },
  { id: "panel3", title: "Section 3", content: "Content for section 3." },
];

const Accordion = () => {

    const [openIndex, setOpenIndex] = useState(null);
    const headersRef = useRef([]);

    const toggleIndex = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    }

  return (
    <>
    <div>
        {
            items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                <div key={item.id}>
                    <button
                        onClick={() => toggleIndex(index)}
                        ref={(el) => (headersRef.current[index] = el)}>{item.title}</button>

                    {
                        isOpen && (
                            <div id={`${item.id}-content`}>{item.content}</div>
                        )
                    }
                </div>
            )})
        }
    </div>
    </>
  )
}

export default Accordion