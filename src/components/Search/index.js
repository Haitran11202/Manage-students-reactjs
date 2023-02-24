import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";

function Search() {
    const { students, setStudents } = useContext(AppContext);
    const [search, setSearch] = useState();
    const navigate = useNavigate();
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const handleSearching = () => {
        const filteredStudents = students.filter((student) =>
            student.TenSV.toLowerCase().includes(search.toLowerCase())
        );
        if (filteredStudents.length > 0) {
            setStudents(filteredStudents);
        } else {
            setStudents(students);
        }
        navigate("/");
    };
    return (
        <div className="search-wrapper">
            <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Nhập từ khóa"
                aria-label="Search"
                value={search}
                onChange={handleSearchChange}
            />
            <button
                // to={{ pathname: "/", search: `?search=${search}` }}
                onClick={handleSearching}
                className="btn btn-outline-success my-2 my-sm-0"
            >
                Tìm kiếm
            </button>
        </div>
    );
}

export default Search;
