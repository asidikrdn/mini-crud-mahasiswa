import React, { useState } from "react";
import RowMahasiswa from "./components/RowMahasiswa";
import TambahMahasiswa from "./components/TambahMahasiswa";

const arrayMahasiswa = [
  {
    nim: "201106041165",
    nama: "Ahmad Sidik Rudini",
    jurusan: "Teknik Informatika",
    asalProvinsi: "Jawa Tengah",
  },
  {
    nim: "201106041166",
    nama: "Amelya Putri Zamzami",
    jurusan: "Teknologi Pangan",
    asalProvinsi: "DKI Jakarta",
  },
  {
    nim: "201106041167",
    nama: "Muhammad Rizki Sya'bani",
    jurusan: "Desain Komunikasi Visual",
    asalProvinsi: "Jawa Barat",
  },
];

const App = () => {
  const [mahasiswas, setMahasiswas] = useState(arrayMahasiswa);

  const handleDuplicateData = (data) => {
    let duplicateData = false;

    mahasiswas.forEach((mahasiswa) => {
      // console.log(
      //   `${mahasiswa.nim} === ${data.nim} : ${mahasiswa.nim === data.nim}`
      // );
      mahasiswa.nim === data.nim && (duplicateData = true);
    });

    // console.log(duplicateData);

    return duplicateData; // Mengembalikan nilai duplicateData
  };

  const handleTambahMahasiswa = (data) => {
    handleDuplicateData(data)
      ? alert("Data mahasiswa sudah ada")
      : setMahasiswas([...mahasiswas, data]);
  };

  const handleEditMahasiswa = (data) => {
    // console.log(data);

    let indexDataEdited = mahasiswas.findIndex(
      (mahasiswa) => mahasiswa.nim === data.nim
    );
    // console.log(indexDataEdited);

    let newMahasiswas = [...mahasiswas];
    newMahasiswas.splice(indexDataEdited, 1, data);
    // console.log(mahasiswas);
    // console.log(newMahasiswas);

    // setMahasiswas(newMahasiswas);
  };

  const handleDeleteMahasiswa = (e) => {
    // console.log(nim);
    let mahasiswaAfterDelete = mahasiswas.filter((mahasiswa) => {
      return mahasiswa.nim !== e.target.id;
    });
    setMahasiswas(mahasiswaAfterDelete);
    // console.log(mahasiswaAfterDelete);
  };

  // console.log(mahasiswas);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <h1 className="text-center">Tabel Mahasiswa</h1>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Jurusan</th>
                <th>Asal Provinsi</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {mahasiswas.map((mahasiswa) => {
                return (
                  <RowMahasiswa
                    key={mahasiswa.nim}
                    mahasiswa={mahasiswa}
                    onEditMahasiswa={handleEditMahasiswa}
                    onDeleteMahasiswa={handleDeleteMahasiswa}
                  />
                );
              })}
              <TambahMahasiswa onTambahMahasiswa={handleTambahMahasiswa} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
