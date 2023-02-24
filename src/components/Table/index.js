import { useContext } from "react";
import { AppContext } from "../../Context";
import { Link } from "react-router-dom";
import { useState } from "react";
function Table() {
    const { students, setStudents } = useContext(AppContext);
    const [selectedStudents, setSelectedStudents] = useState([]);
    console.log(selectedStudents);
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
    const handleDeleteClick = () => {
        const deletedStudents = students.filter(
            (st) => !selectedStudents.includes(st)
        );

        localStorage.setItem("students", JSON.stringify(deletedStudents));
        setStudents(deletedStudents);
    };
    console.log(selectedStudents);
    return (
        <div>
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
                                        <button className="delete-btn">
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
