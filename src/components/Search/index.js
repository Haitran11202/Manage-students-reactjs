import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";

function Search() {
    const { students, setStudents, search, setSearch } = useContext(AppContext);
    const [defaultStudents, setDefaultStudents] = useState([]); //lưu lại danh sách sinh viên trước khi tìm

    const navigate = useNavigate();
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const handleSearching = () => {
        let filteredStudents = students.filter((student) => {
            if (search) {
                return student.TenSV.toLowerCase().includes(
                    search.toLowerCase()
                );
            }
        });
        console.log(filteredStudents);
        if (filteredStudents.length > 0) {
            setStudents(filteredStudents);
            setDefaultStudents(students);
        } else {
            setStudents(defaultStudents);
            navigate("/");
        }
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
