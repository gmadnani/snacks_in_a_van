import React, { useEffect, useState } from "react";
import "./All_Vans.css";
import Van_1 from "../images/Van-1.png";
import { CardDeck, Card } from "react-bootstrap";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Loader from "../loader";
import NavbarComponent from "../Navbar/navbar_component";

function All_Vans(Van_Name) {
  return (
    <div>
      <Card className="card-van">
        <Card.Img variant="top" src={Van_1} />
        <Card.Body>
          <Card.Title>{Van_Name}</Card.Title>
          <Card.Text>
            <Typography
              className="Van_Distance"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              100 meters Away
            </Typography>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <CardActions>
            <a href="/Menu">
              <Button size="small" color="primary">
                See Menu
              </Button>
            </a>
          </CardActions>
        </Card.Footer>
      </Card>
    </div>
  );
}

const VendorsComponent = (props) => {
  const [vendors, setVendors] = useState([]);
  const [loader, setLoader] = useState(true);

  //get vendors
  useEffect(() => {
    setTimeout(async () => {
      await axios
        .get("https://final-snacks-backend.herokuapp.com/vendors")
        .then((res) => setVendors(res.data), setLoader(false));
    }, 500);
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="area top-area">
        <br />
        <br />
        <br />
        <h2 class="all_van_title">All Vans</h2>
        {loader ? <Loader /> : null}
        <div class="container-fluid">
          <div class="row flex-row flex-nowrap pb-4">
            <CardDeck className="vans-grid">
              {vendors?.map((vendor) => (
                <div>{All_Vans(vendor.Vname)}</div>
              ))}
            </CardDeck>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorsComponent;
