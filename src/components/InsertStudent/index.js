import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context";
import "./styles.css";
function InsertStudent() {
    const { students, setStudents } = useContext(AppContext);
    const { id } = useParams();
    localStorage.setItem("students", JSON.stringify(students));
    const [stId, setStId] = useState();
    const [name, setName] = useState();
    const [dob, setDob] = useState();
    const [gender, setGender] = useState();
    const [majors, setMajors] = useState();
    // eslint-disable-next-line no-unused-vars
    const [editingStudent, setEditingStudent] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState();
    const [editModes, setEditModes] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const history = useNavigate();
    console.log(editModes);
    useEffect(() => {
        if (id) {
            const student = students.find((st) => {
                return st.MaSV === id;
            });
            console.log(student);
            if (student) {
                console.log(student);
                setEditModes(true);
                setEditingStudent(student);
                setStId(student.MaSV);
                setName(student.TenSV);
                setDob(student.NgaySinh);
                setGender(student.GioiTinh);
                setMajors(student.MaKhoa);
            }
        }
    }, [id, students]);
    console.log("Add Mode");
    console.log(error);
    const handleAddNew = () => {};
    const validateInput = () => {
        const errors = {};
        if (!stId) {
            errors.stId = "Vui lòng nhập mã sinh viên";
        } else if (isNaN(stId)) {
            errors.stId = "Mã sinh viên phải là một số";
        }
        if (!name) {
            errors.name = "Nhập tên của sinh viên.";
        }

        if (!dob) {
            errors.dob = "Vui lòng nhập ngày sinh";
        }

        if (!gender) {
            errors.gender = "Vui lòng chọn giới tính.";
        }
        if (!majors) {
            errors.majors = "Vui lòng chọn khoa.";
        }
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newStudent = {
            MaSV: stId,
            TenSV: name,
            NgaySinh: dob,
            GioiTinh: gender,
            MaKhoa: majors,
        };
        if (validateInput()) {
            if (editModes) {
                setStudents(
                    students.map((st) => {
                        return st.MaSV === newStudent.MaSV ? newStudent : st;
                    })
                );
            } else {
                setStudents((prev) => {
                    const studentAddNews = [...prev, newStudent];
                    const jsonStudents = JSON.stringify(studentAddNews);
                    localStorage.setItem("students", jsonStudents);
                    return studentAddNews;
                });
                console.log("Add");
            }
            history("/");
        }
    };
    return (
        <div className="input-information">
            <form className="btn" onSubmit={handleSubmit}>
                <div>
                    <button id="btn-new" type="button" onClick={handleAddNew}>
                        Thêm mới
                    </button>
                    <button id="btn-update" type="submit">
                        Cập Nhật
                    </button>
                    <button type="button">Xoá</button>
                </div>
                <div>
                    <div className="form-group">
                        <label className="label-input">Mã sinh viên</label>
                        <div>
                            <input
                                className="input_element"
                                type="text"
                                name="txtMaSV"
                                id="maSv"
                                value={stId}
                                onChange={(event) => {
                                    return setStId(event.target.value);
                                }}
                            />
                            <div className="error-wrapper">
                                <i style={{ color: "red" }}>*</i>
                                {error?.stId && <div>{error?.stId}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label-input">Tên sinh viên</label>
                        <div>
                            <input
                                className="input_element"
                                type="text"
                                name="txTenSV"
                                id="tenSv"
                                value={name}
                                onChange={(event) => {
                                    return setName(event.target.value);
                                }}
                            />
                            <div className="error-wrapper">
                                <i style={{ color: "red" }}>*</i>
                                {error?.name && <div>{error?.name}</div>}
                            </div>
                        </div>
                        <span className="error-message" id="tenSv-error" />
                    </div>
                    <div className="form-group">
                        <label className="label-input">Ngày sinh</label>
                        <div>
                            <input
                                className="input_element"
                                type="text"
                                name="txtNgaySinh"
                                id="ngaySinh"
                                value={dob}
                                onChange={(event) => {
                                    return setDob(event.target.value);
                                }}
                            />
                            <div className="error-wrapper">
                                <i style={{ color: "red" }}>*</i>
                                {error?.dob && <div>{error?.dob}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="gender_element">
                        <label>Giới tính</label>
                        <div className="gender_selector">
                            <input
                                type="radio"
                                defaultValue="nam"
                                className="rdbGioiTinh"
                                name="gender"
                                id="gender"
                                checked={gender === "nam"}
                                onChange={(event) => {
                                    return setGender(event.target.value);
                                }}
                            />
                            <label>Nam</label>
                            <input
                                type="radio"
                                defaultValue="nu"
                                className="rdbGioiTinh"
                                name="gender"
                                defaultChecked
                                id="gender"
                                checked={gender === "nu"}
                                onChange={(event) => {
                                    return setGender(event.target.value);
                                }}
                            />
                            <label>Nữ</label>
                        </div>
                        <div className="error-wrapper">
                            <i style={{ color: "red" }}>*</i>
                            {error?.gender && <div>{error?.gender}</div>}
                        </div>
                    </div>
                    <div>
                        <label>Khoa</label>
                        <select
                            className="khoa"
                            name="Khoa"
                            id="khoa"
                            onChange={(event) => {
                                return setMajors(event.target.value);
                            }}
                        >
                            <option value="">Chọn khoa</option>
                            <option
                                value="Công nghệ thông tin"
                                selected={majors}
                            >
                                Công nghệ thông tin
                            </option>
                            <option value="Khoa học máy tính">
                                Khoa học máy tính
                            </option>
                        </select>
                        <div className="error-wrapper">
                            <i style={{ color: "red" }}>*</i>
                            {error?.majors && <div>{error?.majors}</div>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default InsertStudent;
