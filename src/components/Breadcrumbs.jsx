import React from 'react'

const Breadcrumbs = () => {

    const items = [
        { label: "Home", href: "/" },
        { label: "Library", href: "/library" },
        { label: "Data", href: "/library/data" },
    ];

    return (
        <>
            <nav>
                <ol>
                {
                    items.map((item, idx) => {
                        const isLast = idx === items.length - 1;
                        return (
                            <li key={item.href}>
                                { !isLast ? (
                                    <a href={item.href}>{item.label}</a> ) : (
                                        <span>{item.label}</span>
                                )}
                                { !isLast && (
                                    <span>lol</span>
                                )}
                            </li>
                        )
                    })
                }
                </ol>
            </nav>
        </>
    )
}

export default Breadcrumbs