import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Col, Row, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";

// constructor(props) {
//     super(props);

//     this.state = {
//         SelectedItem : null
//     }

// }

function RenderDish({ dish }) {
    return (
        <div>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                
            </CardBody>
        </div>
    );
}

function RenderComments(dish) {
    const comments = dish.comments.map((comment) => {
        return (
            <React.Fragment>
                <li> {comment.comment} </li> <br />
                <li>    <CardText> -- {comment.author}, {formatDate(comment.date)} </CardText></li> <br />
            </React.Fragment>
        )
    });

    if (dish.comments != null) {
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments}
                </ul>
                <CommentForm />
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
}


function formatDate(date) {
    const option = { year: 'numeric', month: 'short', day: 'numeric' };
    const date1 = new Date(date)
    const newdate = date1.toLocaleDateString("en-US", option)
    return newdate;
}


const DishDetails = (props) => {
    // console.log(props);

    if (props.dish != null) {
        // console.log('d: '+props.dish.description);
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>

                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12 col-md-5 ml-1">
                        <Card>
                            <CardImg width="100%" src={props.dish.image} />
                            <RenderDish dish={props.dish} />
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 ml-1">
                        <RenderComments comments={props.comments} />
                        
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleComment(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render() {
        return (
            <div className="row ml-auto">
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"> Submit Comment</span></Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" className="form-control" name="rating">
                                        <option value="" selected disabled>Select Rating</option>
                                        <option value="one">1</option>
                                        <option value="two">2</option>
                                        <option value="three">3</option>
                                        <option value="four">4</option>
                                        <option value="five">5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Author</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" className="form-control" name="author" placeholder="Your Name"
                                     validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                                    />
                                    <Errors 
                                        className="text-danger" model=".author" show="touched"
                                        messages={{
                                            required: "This is required ",
                                            minLength: "Min length allowed is 3 ",
                                            maxLength: "Max length allowed is 15 "
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" className="form-control" rows="6" name="comment" placeholder="Your comment here..."></Control.textarea>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }


}


export default DishDetails
