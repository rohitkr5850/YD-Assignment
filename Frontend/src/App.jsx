import React, { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("first_name");
  const [filter, setFilter] = useState("");

  // Fetch 50 users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=50");
      const data = await res.json();

      // Map to match my table’s structure
      const mappedUsers = data.results.map((u) => ({
        id: u.login.uuid,
        first_name: u.name.first,
        last_name: u.name.last,
        email: u.email,
      avatar: u.picture.medium,
      }));

      setUsers(mappedUsers);
      setFilteredUsers(mappedUsers);

      //  pagination setup 
      setTotalPages(Math.ceil(mappedUsers.length / 5));
    } 
    catch (error) {
      console.error("Error fetching users:", error);
    }
     finally
      {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search : Filter : Sort
  useEffect(() => {
    let data = [...users];

    if (searchTerm) {
      data = data.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) 
          ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
          ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter) {
    data = data.filter((user) => user.email.endsWith(filter));
    }
    data.sort((a, b) =>
    a[sortKey].localeCompare(b[sortKey], "en", { sensitivity: "base" })
    );
    setFilteredUsers(data);
  }, [searchTerm, sortKey, filter, users]);

  // Pagination
  const usersPerPage = 5;
  const startIndex = (page - 1) * usersPerPage;
  const visibleUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return(
    <div className="container">
      <h1>User Directory Table</h1>

      {/* Controls */}
      <div className="controls">
        <input className="controls-input"
          type="text"
          placeholder="Search by name, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="first_name">Sort by First Name</option>
          <option value="email">Sort by Email</option>
        </select>



        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Domains</option>
          <option value="example.com">example.com</option>
          <option value="gmail.com">gmail.com</option>
          <option value="yahoo.com">yahoo.com</option>
          <option value="outlook.com">outlook.com</option>
        </select>
      </div>



      {/* Table */}

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img src={user.avatar} alt={user.first_name} />
                  </td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          ⬅ Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default App;

