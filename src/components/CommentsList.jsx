// useState and useEffect hooks to update data and render once we fetch from Mock API
import { useState, useEffect } from "react";

export default function CommentList() {
    const [emails, setEmails] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmails = async () =>  {
            try {
            const res = await
                fetch("https://jsonplaceholder.typicode.com/comments") 
                if (!res.ok) throw new
                    Error("Failed fetch");
            const data = await res.json(); setEmails(data);
            console.log("Component Mounted");
        }
            catch (err) { setError(err.message); } finally { setLoading(false); }
        }
        fetchEmails();
    }, []);

    if (loading) return <p> Loading ... </p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
    // its an array of objects not single 
    <div>
        <ul>{emails.map((email) => (<li key={email.id}>{email.email}</li>))}
        </ul>
    </div>
    
    );
}
