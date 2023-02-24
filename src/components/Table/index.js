import { useContext } from "react";
import { AppContext } from "../../Context";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faEdit } from "@fortawesome/free-solid-svg-icons";

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
        <div className="wrapper container-fluid">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã sinh viên</th>
                        <th scope="col">Tên sinh viên</th>
                        <th scope="col">Ngày sinh</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Khoa</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{student.MaSV}</td>
                            <td>{student.TenSV}</td>
                            <td>{student.NgaySinh}</td>
                            <td>{student.GioiTinh}</td>
                            <td>{student.MaKhoa}</td>
                            <td className="st-control">
                                <Link
                                    to={`/insert/${student.MaSV}`}
                                    className="control-btn edit"
                                >
                                    Sửa{" "}
                                    <span>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </span>
                                </Link>
                                <Link
                                    className="control-btn delete"
                                    onClick={() => handleDelete(student.MaSV)}
                                >
                                    Xoá{" "}
                                    <span>
                                        <FontAwesomeIcon icon={faDeleteLeft} />
                                    </span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="control">
                <div>
                    {selectedStudents.length === 0 ? (
                        <></>
                    ) : (
                        <button onClick={handleDeleteClick}>Xóa</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Table;
