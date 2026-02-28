// useState and useEffect hooks to manage data, loading, and error state
import { useState, useEffect } from "react";

export default function CommentList() {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. On mount, trigger async fetch from mock API
  // 2. If response is not ok, throw an error
  // 3. Parse JSON and store array of comment objects in state
  // 4. If fetch fails, catch error and store message in error state
  // 5. Always set loading to false when done (success or failure)
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

  // 6. While fetching, render a loading message
  // 7. If error occurred, render the error message
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // 8. Data is an array of objects — map over each one
  // 9. Render each email field in a list item, using id as the unique key
  return (
    <div>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>{email.email}</li>
        ))}
      </ul>
    </div>
  );
}