import React, { useState, useEffect } from "react";
import "./Vendor_Order.css";

import location from "./images/location.png";
import user from "./images/user.png";
import order from "./images/order.png";
import cup from "./images/CupLids.png";
import axios from "axios";
import VendorOrderItem from "./VendorOrderItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import {
  Checkbox,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 850,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: 700,
    borderBottom: "2px solid black",
  },
  body: {
    fontSize: 14,
    borderBottom: "unset",
    borderTop: "2px solid rgba(224, 224, 224, 1)",
  },
}))(TableCell);

// Table row implementation
class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.changeIsOpen = this.changeIsOpen.bind(this);
  }

  static propTypes = {
    _id: PropTypes.string.isRequired,
    customer: PropTypes.string.isRequired,
    orderItems: PropTypes.array.isRequired,
    orderStatus: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isEdit: PropTypes.bool.isRequired,
  };

  returndata() {
    var data = JSON.stringify({
      orderStatus: "fulfilled",
    });
    return data;
  }

  render() {
    const { _id, customer, orderItems, orderStatus, createdAt, isEdit } =
      this.props;

    console.log("here are orderItems");
    console.log(orderStatus);

    return (
      <React.Fragment>
        <TableRow>
          {" "}
          {isEdit ? (
            <StyledTableCell padding="checkbox">
              <Checkbox style={{ color: "rgb(180,47,252)" }} />
            </StyledTableCell>
          ) : null}
          <StyledTableCell>{_id}</StyledTableCell>
          <StyledTableCell>{customer}</StyledTableCell>
          <StyledTableCell align="center">{orderStatus}</StyledTableCell>
          <div>
            {orderItems?.map((item) => (
              <StyledTableCell>
                <VendorOrderItem orders={item}></VendorOrderItem>
                <br></br>
              </StyledTableCell>
            ))}
          </div>
          <StyledTableCell align="right">{createdAt}</StyledTableCell>
          {orderStatus === "Outstanding" ? (
            <StyledTableCell align="right">
              <Button
                variant="contained"
                color="primary"
                onClick={(e, data = this.returndata()) =>
                  axios
                    .post(
                      "https://final-snacks-backend.herokuapp.com/vendors/order/fulfilled/" +
                        _id,
                      data,
                      {
                        headers: { "Content-Type": "application/json" },
                      }
                    )
                    .then(function (response) {
                      console.log(data);
                      console.log(response);

                      alert("Marked fulfilled");
                      window.location.reload(true);
                    })
                    .catch(function (error) {
                      console.log(data);
                      console.log(error);
                    })
                }
              >
                Mark as Fulfilled
              </Button>
            </StyledTableCell>
          ) : (
            <div>
              {orderStatus === "Fulfilled" ? (
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e, data = this.returndata()) =>
                      axios
                        .post(
                          "https://final-snacks-backend.herokuapp.com/vendors/order/completed/" +
                            _id,
                          data,
                          {
                            headers: { "Content-Type": "application/json" },
                          }
                        )
                        .then(function (response) {
                          console.log(data);
                          console.log(response);

                          alert("Marked completed");
                          window.location.reload(true);
                        })
                        .catch(function (error) {
                          console.log(data);
                          console.log(error);
                        })
                    }
                  >
                    Picked up
                  </Button>
                </StyledTableCell>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </TableRow>
      </React.Fragment>
    );
  }

  changeIsOpen() {
    const isOpen = this.state.isOpen;
    this.setState({ isOpen: !isOpen });
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Vendor_Order() {
  const [orders, setOrders] = useState([]);
  const [fulfilledOrders, setFufilledOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  //get request for outstanding orders
  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get(
          "https://final-snacks-backend.herokuapp.com/vendors/order/outstanding"
        )
        .then((res) => setOrders(res.data));
    }, 500);
  }, []);

  //get request for fulfilled orders

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get(
          "https://final-snacks-backend.herokuapp.com/vendors/order/fulfilled"
        )
        .then((res) => setFufilledOrders(res.data));
    }, 500);
  }, []);

  //get request for completed orders

  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get(
          "https://final-snacks-backend.herokuapp.com/vendors/order/completed"
        )
        .then((res) => setCompletedOrders(res.data));
    }, 500);
  }, []);

  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="page">
      <div className="left_nav">
        <p id="icon">
          <img src={cup} alt="error" />
        </p>
        <p>
          <a href="/Vendor_Status">
            <img src={location} alt="error" />
          </a>
        </p>
        <p style={{ background: "#F0E3FF" }}>
          <a href="/Vendor_Order">
            <img src={order} alt="error" />
          </a>
        </p>
        <p>
          <a href="/Vendor_Profile">
            <img src={user} alt="error" />
          </a>
        </p>
      </div>
      <div className="body">
        <div>
          <p id="Orders">Orders</p>
          {/* <a href="">Download Data</a> */}
        </div>
        <div id="tabs">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
          >
            <Tab label="Outstanding" {...a11yProps(0)} />
            <Tab label="Fulfilled" {...a11yProps(1)} />
            <Tab label="Completed" {...a11yProps(2)} />
          </Tabs>
        </div>
        <TableContainer
          component={Paper}
          style={{ padding: "0 30px", width: "auto" }}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {isEdit ? <StyledTableCell>{}</StyledTableCell> : null}
                <StyledTableCell>
                  <ul id="menu">
                    <li>Order Number</li>
                    <li>Customer</li>
                    <li>Order Status</li>
                    <li>Order Items</li>
                    <li>Created</li>
                  </ul>
                </StyledTableCell>
              </TableRow>
            </TableHead>

            {/* tab mapping */}
            <TableBody>
              <TabPanel value={value} index={0}>
                {orders?.order?.map((item) => (
                  <Row key={item._id} {...item} isEdit={isEdit} />
                ))}
              </TabPanel>
            </TableBody>

            <TableBody>
              <TabPanel value={value} index={1}>
                {fulfilledOrders?.order?.map((item) => (
                  <Row key={item._id} {...item} isEdit={isEdit} />
                ))}
              </TabPanel>
            </TableBody>

            <TableBody>
              <TabPanel value={value} index={2}>
                {completedOrders?.order?.map((item) => (
                  <Row key={item._id} {...item} isEdit={isEdit} />
                ))}
              </TabPanel>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
