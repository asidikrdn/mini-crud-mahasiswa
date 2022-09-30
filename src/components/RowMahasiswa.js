import React, { useRef, useState } from "react";

const RowMahasiswa = (props) => {
  const [formInput, setFormInput] = useState({
    nim: props.mahasiswa.nim,
    nama: props.mahasiswa.nama,
    jurusan: props.mahasiswa.jurusan,
    asalProvinsi: props.mahasiswa.asalProvinsi,
  });
  const [editStatus, setEditStatus] = useState(false);
  const [errors, setErrors] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    asalProvinsi: "",
  });
  const dataReset = useRef({});

  const handleInputChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleEditCondition = () => {
    if (editStatus) {
      setFormInput(dataReset.current);
      setEditStatus(!editStatus);
    } else {
      dataReset.current = { ...formInput };
      setEditStatus(!editStatus);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let pesanErrors = {};

    // Validasi NIM
    if (formInput.nim.trim() === "") {
      pesanErrors.nim = "NIM tidak boleh kosong";
    } else if (!/^[\d]{12}/.test(formInput.nim)) {
      pesanErrors.nim = "NIM harus 12 digit angka";
    } else {
      pesanErrors.nim = "";
    }

    // Validasi Nama
    formInput.nama.trim() === ""
      ? (pesanErrors.nama = "Nama tidak boleh kosong")
      : (pesanErrors.nama = "");

    // Validasi Jurusan
    formInput.jurusan.trim() === ""
      ? (pesanErrors.jurusan = "Jurusan tidak boleh kosong")
      : (pesanErrors.jurusan = "");

    // Validasi Asal Provinsi
    formInput.asalProvinsi.trim() === ""
      ? (pesanErrors.asalProvinsi = "Asal Provinsi tidak boleh kosong")
      : (pesanErrors.asalProvinsi = "");

    // Update State Error
    setErrors(pesanErrors);

    // Pemeriksaan seluruh validasi
    let formValid = true;
    for (let inputName in pesanErrors) {
      pesanErrors[inputName] !== "" && (formValid = false);
    }
    // console.log(formValid);

    // Jika lolos validasi, jalankan perintah didalamnya
    if (formValid) {
      // console.log(formInput);
      props.onEditMahasiswa(formInput);
      setEditStatus(false);
    }
  };

  // const handleCancelButton = (e) => {};

  return (
    <>
      {editStatus ? (
        <tr>
          <td colSpan="5">
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    name="nim"
                    placeholder="Masukkan NIM"
                    className="form-control"
                    value={formInput.nim}
                    onChange={handleInputChange}
                    disabled
                  />
                  {errors && <small>{errors.nim}</small>}
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="nama"
                    placeholder="Masukkan Nama"
                    className="form-control"
                    value={formInput.nama}
                    onChange={handleInputChange}
                  />
                  {errors && <small>{errors.nama}</small>}
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="jurusan"
                    placeholder="Masukkan Jurusan"
                    className="form-control"
                    value={formInput.jurusan}
                    onChange={handleInputChange}
                  />
                  {errors && <small>{errors.jurusan}</small>}
                </div>
                <div className="col">
                  <input
                    type="text"
                    name="asalProvinsi"
                    placeholder="Masukkan Asal Provinsi"
                    className="form-control"
                    value={formInput.asalProvinsi}
                    onChange={handleInputChange}
                  />
                  {errors && <small>{errors.asalProvinsi}</small>}
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-success me-2">
                    Simpan
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={handleEditCondition}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </form>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{formInput.nim}</td>
          <td>{formInput.nama}</td>
          <td>{formInput.jurusan}</td>
          <td>{formInput.asalProvinsi}</td>
          <td>
            <button
              className="btn btn-secondary me-2"
              id={formInput.nim}
              onClick={handleEditCondition}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              id={formInput.nim}
              onClick={props.onDeleteMahasiswa}
            >
              Hapus
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default RowMahasiswa;
