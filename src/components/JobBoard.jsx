import React, { useState, useMemo } from 'react'

const jobsData = [
    { id: 1, title: "Frontend Engineer", company: "Acme", location: "Remote", category: "Engineering", description: "Build UI components" },
    { id: 2, title: "Backend Developer", company: "BetaCorp", location: "NYC", category: "Engineering", description: "Develop APIs" },
    { id: 3, title: "Marketing Manager", company: "Gamma Inc", location: "Remote", category: "Marketing", description: "Lead campaigns" },
    { id: 4, title: "Marketing Manager", company: "Sigma Inc", location: "Remote", category: "Marketing", description: "Lead campaigns" },
    { id: 5, title: "Marketing Manager", company: "Lola Inc", location: "Remote", category: "Marketing", description: "Lead campaigns" },
    { id: 6, title: "Marketing Manager", company: "Arcus Inc", location: "Remote", category: "Marketing", description: "Lead campaigns" },
    { id: 7, title: "Marketing Manager", company: "Maud Inc", location: "Remote", category: "Marketing", description: "Lead campaigns" },
    { id: 8, title: "Marketing Manager", company: "Damaian Inc", location: "Remote", category: "Marketing", description: "Lead campaigns" },
    // Add more job objects...
];

const PAGE_SIZE = 5;

const JobBoard = () => {

    const [categoryFilter, setCategoryFilter] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    // Filter jobs by category and search keyword
    const filteredJobs = useMemo(() => {
        return jobsData.filter((job) => {
            const matchesCategory = categoryFilter ? job.category === categoryFilter : true;
            const matchesSearch =
                search === "" ||
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.company.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [categoryFilter, search]);

    // Paginate filtered jobs
    const paginatedJobs = filteredJobs.slice(0, page * PAGE_SIZE);

    const loadMore = () => {
        setPage((prev) => prev + 1);
    };

    const categories = [...new Set(jobsData.map((job) => job.category))];

    return (
        <>
            <div>
                <h1>Job Board</h1>

                {/* Filters */}
                <div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => {
                            setCategoryFilter(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <input
                        type="search"
                        placeholder="Search jobs"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                {/* Job list */}
                <ul role="list" className="space-y-4">
                    {paginatedJobs.length === 0 && <li>No jobs found.</li>}
                    {paginatedJobs.map((job) => (
                        <li
                            key={job.id}
                            tabIndex={0}
                            role="article"
                        >
                            <h2>{job.title}</h2>
                            <p>{job.company} — {job.location}</p>
                            <p>{job.description}</p>
                        </li>
                    ))}
                </ul>

                {/* Load more */}
                {paginatedJobs.length < filteredJobs.length && (
                    <button
                        onClick={loadMore}
                    >
                        Load More
                    </button>
                )}
            </div>
        </>
    )
}

export default JobBoard