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
    const navigate = useNavigate();
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
    const handleAddNew = () => {
        setStId("");
        setName("");
        setDob("");
        setGender("");
        setMajors("");
    };
    const validateInput = () => {
        const errors = {};
        console.log(error);
        let checkId = students.some((st) => st.MaSV === stId);
        console.log(checkId);
        if (!stId) {
            errors.stId = "Vui lòng nhập mã sinh viên";
        } else if (isNaN(stId)) {
            errors.stId = "Mã sinh viên phải là một số";
        } else if (checkId) {
            errors.stId = "Mã sinh viên đã tồn tại";
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
            }
            navigate("/");
        }
    };
    return (
        <div className="input-information container">
            <form className="form-sub " onSubmit={handleSubmit}>
                <div class="form-group row">
                    <label for="inputId3" class="col-sm-2 col-form-label">
                        Mã sinh viên
                    </label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            className={`form-control ${
                                error?.stId && "is-invalid"
                            } `}
                            id="inputId3"
                            placeholder="Nhập mã sinh viên"
                            value={stId}
                            onChange={(event) => {
                                return setStId(event.target.value);
                            }}
                        />
                        <div className="invalid-feedback">{error?.stId}</div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputName3" class="col-sm-2 col-form-label">
                        Tên sinh viên
                    </label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            className={`form-control ${
                                error?.name && "is-invalid"
                            } `}
                            id="inputName3"
                            placeholder="nhập tên sinh viên"
                            value={name}
                            onChange={(event) => {
                                return setName(event.target.value);
                            }}
                        />
                        <div className="invalid-feedback">{error?.name}</div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputDob" class="col-sm-2 col-form-label">
                        Ngày sinh
                    </label>
                    <div class="col-sm-10">
                        <input
                            type="text"
                            className={`form-control ${
                                error?.dob && "is-invalid"
                            } `}
                            id="inputDob"
                            placeholder="Nhập ngày sinh"
                            value={dob}
                            onChange={(event) => {
                                return setDob(event.target.value);
                            }}
                        />
                        <div className="invalid-feedback">{error?.dob}</div>
                    </div>
                </div>
                <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-sm-2 pt-0">
                            Giới tính
                        </legend>
                        <div class="col-sm-10">
                            <div className="form-check">
                                <input
                                    type="radio"
                                    defaultValue="nam"
                                    className={`form-check-input ${
                                        error?.gender && "is-invalid"
                                    } `}
                                    name="gender"
                                    id="gender"
                                    checked={gender === "nam"}
                                    onChange={(event) => {
                                        return setGender(event.target.value);
                                    }}
                                />
                                <label>Nam</label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    defaultValue="nu"
                                    className={`form-check-input ${
                                        error?.gender && "is-invalid"
                                    } `}
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
                            <div className="gender-error">{error?.gender}</div>
                        </div>
                    </div>
                </fieldset>
                <div class="form-group row">
                    <label for="inputMajor" class="col-sm-2 col-form-label">
                        Khoa
                    </label>
                    <div class="col-sm-10">
                        <select
                            className={`khoa form-control ${
                                error?.gender && "is-invalid"
                            } `}
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
                        <div className="invalid-feedback">{error?.majors}</div>
                    </div>
                </div>
                <div class="form-group row ">
                    <div class="col-sm-10">
                        <div className="btn-wrapper form-group">
                            <button
                                className="btn btn-primary"
                                id="btn-update"
                                type="submit"
                            >
                                Cập Nhật
                            </button>
                            {/* <button
                                className="btn btn-secondary"
                                id="btn-new"
                                type="button"
                                onClick={handleAddNew}
                            >
                                Thêm mới
                            </button> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default InsertStudent;
