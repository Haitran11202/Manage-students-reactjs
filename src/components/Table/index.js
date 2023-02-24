import { useContext } from "react";
import { AppContext } from "../../Context";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles.css";
function Table() {
    const { students, setStudents } = useContext(AppContext);
    const [selectedStudents, setSelectedStudents] = useState([]);
    // Xử lý khi người dùng click vào check box
    const handleCheckBoxChange = (event, student) => {
        if (event.target.checked) {
            setSelectedStudents([...selectedStudents, student]);
        } else {
            setSelectedStudents(
                selectedStudents.filter(
                    (selectedStudent) => selectedStudent.MaSV !== student.MaSV
                )
            );
        }
    };
    // Xóa nhiều sinh viên cùng lúc
    const handleDeleteClick = () => {
        const confirmlog = window.confirm(
            "Bạn có chắc chắn muốn xóa các sinh viên này không:"
        );
        if (confirmlog) {
            const deletedStudents = students.filter(
                (st) => !selectedStudents.includes(st)
            );

            localStorage.setItem("students", JSON.stringify(deletedStudents));
            setStudents(deletedStudents);
        } else {
            return;
        }
    };
    //Xóa một sinh viên
    const handleDelete = (maSv) => {
        const confirmlog = window.confirm("Bạn muốn xóa sinh viên này không ?");
        if (confirmlog) {
            const deletedStudents = students.filter((st) => st.MaSV !== maSv);
            localStorage.setItem("students", JSON.stringify(deletedStudents));
            setStudents(deletedStudents);
        } else {
            return;
        }
    };
    return (
        <div className="table-wrapper">
            <div class="result">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Mã sinh viên</th>
                            <th>Tên sinh viên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Khoa</th>
                            <th colSpan="2">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => {
                            return (
                                <tr>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            onChange={(event) =>
                                                handleCheckBoxChange(
                                                    event,
                                                    student
                                                )
                                            }
                                        />
                                    </td>
                                    <td>{student.MaSV}</td>
                                    <td>{student.TenSV}</td>
                                    <td>{student.NgaySinh}</td>
                                    <td>{student.GioiTinh}</td>
                                    <td>{student.MaKhoa}</td>
                                    <td>
                                        <Link
                                            to={`/insert/${student.MaSV}`}
                                            className="edit-btn"
                                        >
                                            Sửa
                                        </Link>
                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(student.MaSV)
                                            }
                                        >
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <Link to="/insert">Thêm sinh viên</Link>
            </div>
            <div>
                {selectedStudents.length === 0 ? (
                    <></>
                ) : (
                    <button onClick={handleDeleteClick}>Xóa</button>
                )}
            </div>
        </div>
    );
}

export default Table;
