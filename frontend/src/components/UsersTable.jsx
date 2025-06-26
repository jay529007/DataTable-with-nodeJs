import { useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import { api } from "../api";
import "./tablecss.css";
import { FaArrowUp } from "react-icons/fa";

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
  ];

  // Debounce search text
  const [query, setQuery] = useState("");
  useEffect(() => {
    const id = setTimeout(() => setQuery(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.post("/users", {
        page,
        pageSize: rowsPerPage,
        search: query ?? "",
        sortField,
        sortOrder,
      });
      setData(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }

    // fetchData();
  }, [page, rowsPerPage, query, sortField, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4 font-bold">Users</h1>

      <input
        className="border px-2 py-1 mb-3 rounded"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        highlightOnHover
        // customStyles={} // for custom styles
        sortIcon={<FaArrowUp />}
        pagination
        paginationServer
        // paginationRowsPerPageOptions={[]} // disable other options
        paginationTotalRows={total}
        paginationDefaultPage={page}
        onChangePage={(p) => setPage(p)}
        onChangeRowsPerPage={(n, p) => {
          setRowsPerPage(n);
          setPage(1);
        }}
        sortServer
        onSort={(col, sortDirection) => {
          const key =
            typeof col.selector === "function"
              ? col.selector({ id: "id", name: "name", email: "email" })
              : col.name?.toLowerCase();
          setSortField(key);
          setSortOrder(sortDirection);
        }}
      />
    </div>
  );
};

export default UsersTable;
