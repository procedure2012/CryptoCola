import React from "react";
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ColaList(props) {
    let colList=[], rowList=[];
    props.items.forEach((data, index) => {
        var item = (
            <Col xs={3} md={3} lg={3}>{data}</Col>
        );
        colList.push(item);
        if (((index % 3) === 0 && (index !== 0)) || (index === props.items.length-1)) {
            item = (
                <Row>
                    {colList}
                </Row>
            );
            rowList.push(item);
            colList = [];
        }
    });

    return (rowList);
}

export default ColaList;
