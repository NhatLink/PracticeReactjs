import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAlluser } from "../service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _ from "lodash";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./TableUser.scss";
import Button from "react-bootstrap/Button";
import { debounce } from "lodash";
const TableUsers = (props) => {
  const [listUser, setlistUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [userEditData, setUserEditData] = useState({});
  const [userDeleteData, setUserDeleteData] = useState({});

  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [sortBy, setsortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [keyWord, setKeyWord] = useState("");

  const handleSort = (sortBy, sortField) => {
    setsortBy(sortBy);
    setSortField(sortField);

    let cloneListUser = _.cloneDeep(listUser);
    // cloneListUser = cloneListUser.sort((a, b) => a[sortField] - b[sortField]);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setlistUser(cloneListUser);
  };

  const handleUpdateTable = (user) => {
    setlistUser([user, ...listUser]);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);

    cloneListUser[index].first_name = user.first_name;

    setlistUser(cloneListUser);

    // console.log(listUser, cloneListUser);
    // console.log("check ID edit: ", user);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);

    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);

    setlistUser(cloneListUser);

    // console.log(listUser, cloneListUser);
    // console.log("check ID edit: ", user);
  };

  useEffect(() => {
    getUser(1);
  }, []);

  const getUser = async (page) => {
    let res = await fetchAlluser(page);
    if (res && res.data) {
      setlistUser(res.data);
      setTotalUser(res.total);
      setTotalPage(res.total_pages);
    }
  };
  // console.log(listUser);

  const handlePageClick = (event) => {
    getUser(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    console.log("Edit user info ", user);
    setUserEditData(user);
    setShowUpdate(true);
  };

  const handleDeleteUser = (user) => {
    console.log("delete user info ", user);
    setUserDeleteData(user);
    setShowDelete(true);
  };

  const handleSearch = () => {
    let word = keyWord;
    console.log("word>>> ", word);
    if (word) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(word));
      setlistUser(cloneListUser);
    } else {
      getUser(1);
    }
  };

  return (
    <>
      <div className="my-3 add-user">
        <span>List Users</span>
        <ModalAddNew handleUpdateTable={handleUpdateTable} />
      </div>

      <div className="col-6 my-3 searchplace">
        <input
          className="form-control"
          placeholder="Search user by email....."
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value.trimStart())}
        />
        <Button variant="primary" onClick={handleSearch}>
          Search User
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>id </span>
                <span>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Avatar</th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First name </span>
                <span>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUser.map((item, index) => {
            return (
              <tr key={`user-${index}`}>
                <td>{item.id}</td>
                <td>
                  <div>
                    <img src={item.avatar} alt="Avatar" />
                  </div>
                </td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => {
                      handleEditUser(item);
                    }}
                  >
                    Edit User
                  </button>
                  <button
                    className="btn btn-danger mx-3"
                    onClick={() => {
                      handleDeleteUser(item);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalEditUser
        showProp={showUpdate}
        handleClose={() => {
          setShowUpdate(false);
        }}
        userEditData={userEditData}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalConfirm
        showProp={showDelete}
        handleClose={() => {
          setShowDelete(false);
        }}
        userDeleteData={userDeleteData}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};
export default TableUsers;
