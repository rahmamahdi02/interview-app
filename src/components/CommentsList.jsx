// useState and useEffect hooks to manage data, loading, and error state
import { useState, useEffect } from "react";

export default function CommentList() {
    const [emails, setEmails] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");        // FIX 1: was missing
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // On mount, trigger async fetch from mock API
    // If response is not ok, throw an error
    // Parse JSON and store array of comment objects in state
    // If fetch fails, catch error and store message in error state
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/comments");
                if (!res.ok) throw new Error("Failed fetch");
                const data = await res.json();
                setEmails(data);
                console.log("Component Mounted");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchEmails();
    }, []);

    // If error occurred, render the error message
    if (error) return <p>Error: {error}</p>;

    //  Derive filtered list from search state, no extra fetch needed
    // Compare lowercase email string against lowercase search term remove case sensitivity
    const filtered = emails.filter((email) =>
        email.email.toLowerCase().includes(search.toLowerCase())
    );

    // Data is an array of objects, map sover each one
    // Render each email field in a list item, using id as the unique key
    return (
        <div>
            <input
                type="text"
                placeholder="Search emails..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

{filtered.map((comment) => (
                <div key={comment.id} style={{
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "12px",
                    marginBottom: "12px"
                }}>
                    <p><strong>{comment.name}</strong></p>
                    <p>{comment.email}</p>
                    <p>{comment.body}</p>
                </div>
            ))}
        </div>
    );
}