import React, { useEffect, useState } from "react";
import Sidebar from "../components/DashboardGA/Sidebar";
import Navbar from "../components/DashboardGA/Navbar";
import Table from "../components/ExamplesTable";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Card, Row, Col } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';

const Report = () => {
  const [allUser, setAllUser] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });

  const [deletesUser, setDeletesUSer] = useState({
    id_income: 0,
  });

  useEffect(() => {
    loadUser();
  }, []);


  const loadUser = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5005/users`);
      setAllUser(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // const deleteIncome = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await axios.delete(
  //       `http://localhost:5000/income/${deletesIncome.id_income}`,
  //       { validateStatus: false }
  //     );
  //     if (data.status === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Income Deleted!",
  //         text: data.data.msg,
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Income Failed!",
  //         text: data.data.msg,
  //       });
  //     }
  //     $("#deleteincomemodal").modal("hide");
  //     loadUser();
  //   } catch (error) {
  //     console.error("Error deleting income:", error);
  //   }
  // };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5005/users", newUser, {
        validateStatus: false,
      });

      if (data.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Income Added!",
          text: data.data.msg,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Income Failed!",
          text: data.data.msg,
        });
      }
      // $("#addincomemodal").modal("hide");

      // Reload the income data after adding
      loadUser();

      // Clear the input fields
      setNewUser({ username: "", password: ""});
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleDeleteOnClick = (id) => {
    setDeletesUSer({ id: id });
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <Row className="mb-4">
            <Col>
              <Card className="text-center">
                <Card.Body>
                  <h4>1</h4>
                  <p>Permintaan Aset</p>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center">
                <Card.Body>
                  <h4>1</h4>
                  <p>Peminjaman Aset</p>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center">
                <Card.Body>
                  <h4>1</h4>
                  <p>Permintaan Mutasi</p>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center">
                <Card.Body>
                  <h4>0</h4>
                  <p>Permintaan Laporan Aset</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Header className="bg-warning text-white">Jumlah Aset Berdasarkan Jenis</Card.Header>
                <Card.Body>
                  {/* <Pie data={pieData} /> */}
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header className="bg-warning text-white">Kebutuhan Aset Berdasarkan Jenis</Card.Header>
                <Card.Body>
                  {/* <Bar data={barData} /> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* add income Modal*/}
      <div
        className="modal fade"
        id="addincomemodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Income
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={addUser}>
                <div className="form-group">
                  <label htmlFor="amount">Amounts</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text rounded-0">Rp.</span>
                    <input
                      type="number"
                      class="form-control"
                      aria-label="Amount (to the nearest dollar)"
                      id="amount"
                      name="amount"
                      value={newUser.amount}
                      onChange={handleInputChange}
                      min={1}
                      placeholder="0"
                      required
                    />
                    <span class="input-group-text rounded-0">.00</span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="time_stamp">Time Stamp</label>
                  <input
                    type="date"
                    className="form-control"
                    id="time_stamp"
                    name="time_stamp"
                    value={newUser.time_stamp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary m-1">
                  Submit
                </button>
                <button
                  className="btn btn-secondary m-1 "
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* delete income Modal*/}
      <div
        className="modal fade"
        id="deleteincomemodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete income
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={deletesUser}>
                <input
                  type="hidden"
                  name="id_income"
                  id="id_income"
                  value={deletesUser.id}
                />
                <p>Are you sure want to delete this income? </p>
                <button type="submit" className="btn btn-primary m-1">
                  Delete
                </button>
                <button
                  className="btn btn-secondary m-1 "
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
