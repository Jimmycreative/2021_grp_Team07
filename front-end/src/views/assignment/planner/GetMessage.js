import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";

function GetMessage() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="10">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={require("assets/img/damir-bosnjak.jpg").default}
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.ViewMessage()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/mike.jpg").default}
                    />
                    <h5 className="title">Chet Faker</h5>
                  </a>
                  <p className="description">@chetfaker</p>
                </div>
                <p className="description text-center">
                  "I like the way you work it <br />
                  No diggity <br />I wanna bag it up"
                </p>
              </CardBody>

              
              
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default GetMessage;