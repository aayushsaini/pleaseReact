import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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
                <div className="row mt-2">
                    <div className="col-12 col-md-5 ml-1">
                        <Card>
                            <CardImg width="100%" src={props.dish.image} />
                            <RenderDish dish={props.dish} />
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 ml-1">
                        <RenderComments comments={props.dish.comments} />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <h1>Select Dish</h1>
        );
    }
}


export default DishDetails
