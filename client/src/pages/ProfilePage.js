import React from "react";
import { useSelector, useDispatch } from "react-redux";

const ProfilePage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3 className="py-3 heading">User Profile</h3>

            <div className="mb-3">
              <label for="" className="form-label">
                Full name
              </label>
              <input
                type="email"
                className="form-control"
                id=""
                placeholder=""
              />
            </div>

            <div className="mb-3">
              <label for="" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id=""
                placeholder=""
              />
            </div>

            <div className="mb-3">
              <label for="" className="form-label">
                Phone
              </label>
              <input
                type="email"
                className="form-control"
                id=""
                placeholder=""
              />
            </div>

            <div className="mb-3">
              <label for="" className="form-label">
                Date of birth
              </label>
              <input type="date" className="form-control" id="" />
            </div>

            <div className="gender mb-3">
              <div className="">
                <label for="" className="form-label">
                  Gender
                </label>
              </div>

              <span className="pe-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="male"
                />
                <label className="form-check-label ps-2" for="male">
                  Male
                </label>
              </span>

              <span>
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="female"
                  checked
                />
                <label className="form-check-label ps-2" for="female">
                  Female
                </label>
              </span>
            </div>
            <button type="button" class="btn btn-primary">
              Update
            </button>
          </div>

          <div className="col-9">
            <h3 className="py-3 heading">My Orders</h3>

            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">DATE</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">PAID</th>
                  <th scope="col">DELIVERED</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@fat</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
