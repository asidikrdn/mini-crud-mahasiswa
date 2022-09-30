import React, { useState } from "react";

const TambahMahasiswa = (props) => {
  const [formInput, setFormInput] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    asalProvinsi: "",
  });

  const [errors, setErrors] = useState({
    nim: "",
    nama: "",
    jurusan: "",
    asalProvinsi: "",
  });

  const handleInputChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
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

      // Menjalankan function handleTambahMahasiswa yang ada di komponen App
      props.onTambahMahasiswa(formInput);

      // Mengosongkan Form Input
      setFormInput({
        nim: "",
        nama: "",
        jurusan: "",
        asalProvinsi: "",
      });
    }
  };

  return (
    <tr>
      <td colSpan="5">
        <form onSubmit={handleFormSubmit}>
          <div className="row g-3">
            <div className="col">
              <input
                type="text"
                name="nim"
                placeholder="Masukkan NIM"
                className="form-control"
                value={formInput.nim}
                onChange={handleInputChange}
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
              <button type="submit" className="btn btn-primary">
                Tambah
              </button>
            </div>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default TambahMahasiswa;
