import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { postReview } from "../contexts/AuthContext";

import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    FormTextarea,
    Button
} from "shards-react";
import { db } from "../Services/FireService";

export default function DetailsPage(props) {
    const [RatingValue, setRatingValue] = React.useState(4);
    const [Review, setReview] = React.useState('');
    const [ListOfReviews, setListOfReviews] = React.useState([])
    const [CumRatinge, setCumRatinge] = React.useState(0)
    let len;
    let data = 0;

    const GetReviews = async () => {
        //Getting Review
        await db.collection("review").doc(props.info.BookID).collection("Reviews").get().then(queryResult => {
            setListOfReviews([])
            queryResult.forEach(doc => {
                ListOfReviews.push(doc.data())
            })
            ListOfReviews.reverse()
            setListOfReviews(ListOfReviews)

            if (ListOfReviews.length === 0) {
                console.log("No review Yet!");
                len = 0
                setCumRatinge(0)
            }
            else {
                let rat = 0
                ListOfReviews.forEach(lst => {
                    rat += lst.Rated
                })
                rat = rat / (ListOfReviews.length)
                console.log(rat)
                setCumRatinge(rat)
            }
        });
        data += 1;
        // eslint-disable-next-line no-undef

    }

    const PostReviewBtn = async () => {
        // Posting Review
        db.collection("review").doc(props.info.BookID).collection("Reviews").doc(len).set({
            Author: props.currentUser.Username,
            Comment: Review,
            Rated: RatingValue,
            time: firebase.firestore.Timestamp.now()
        }).then(function () {
            console.log("WRITTEN SUCCESSFULLY!");
            ListOfReviews.push({
                Author: props.currentUser.Username,
                Comment: Review,
                Rated: RatingValue,
                time: firebase.firestore.Timestamp.now()
            }
            )
            setListOfReviews(ListOfReviews)
            console.log(ListOfReviews)
        }).catch(function (error) {
            console.log("Error Writing Document : ", error);
        })
    }

    useEffect(() => {
        GetReviews()
    }, data)

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <div>
                <Card className="sticky-top" style={{ minWidth: '400px', maxWidth: '400px', margin: '2em', alignSelf: 'center', position: 'sticky' }}>
                    {(props.info.imageLinks === undefined) ?
                        <CardImg
                            top
                            src="https://picsum.photos/450/650"
                            style={{ width: 400, height: 650 }}
                        /> : <CardImg
                            top
                            src={props.info.imageLinks.thumbnail}
                            style={{ width: 400, height: 650 }}
                        />}

                    <CardBody style={{ background: 'white' }}>
                        {(CumRatinge !== 0) ? <div><Rating name="read-only" value={CumRatinge} readOnly /></div> : <div>Not Rated Yet</div>}
                        <CardTitle>{props.info.title}</CardTitle>

                    </CardBody>
                    <CardFooter className='back'>
                        <Link to='/'>{'< Go back to home'}</Link>
                    </CardFooter>
                </Card>
            </div>
            <div>
                <Card style={{ maxWidth: '750px', margin: '2em 2em 2em 0', width: 'auto', justifySelf: 'center', alignSelf: 'center', }}>
                    <CardHeader>Book Details</CardHeader>
                    <CardBody>

                        {(props.info.authors !== undefined) ?
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                                <h6>Authors: </h6>
                                {props.info.authors.map((author, i) => {
                                    return (<p key={i}>{', ' + author} </p>)
                                })}

                            </div> : ''}

                        {(props.info.publisher !== undefined) ?
                            <div style={{ display: 'flex' }}>
                                <h6>Publisher </h6> <p>: {props.info.publisher}</p>
                            </div> : ''}

                        {(props.info.publishedDate !== undefined) ?
                            <div style={{ display: 'flex' }}>
                                <h6>Publishing Date: </h6> <p>: {props.info.publishedDate}</p>
                            </div> : ''}


                        <div style={{ display: 'flex' }}>
                            <h6>Details </h6>
                            <p>: {props.info.description}</p>
                        </div>
                    </CardBody>
                </Card>
                {props.IsLoggedIn ? <div>
                    <Card style={{ maxWidth: '750px', margin: '2em 2em 2em 0', width: 'auto', justifySelf: 'center', alignSelf: 'center', }}>
                        <CardHeader style={{ display: 'flex' }}>

                            <div style={{ display: 'flex' }}>Give a Review</div>

                            <div style={{ flex: 'auto' }}></div>

                            <div style={{ display: 'flex', }}>
                                <Rating
                                    name="simple-controlled"
                                    value={RatingValue}
                                    onChange={(event, newValue) => {
                                        setRatingValue(newValue);
                                    }}
                                /></div>


                        </CardHeader>
                        <CardBody>
                            <FormTextarea onChange={(event) => { setReview(event.target.value) }}></FormTextarea>
                            <div style={{ display: 'flex', margin: '2em 0 0 0' }}>
                                <div style={{ flex: 'auto' }}></div>
                                <Button onClick={PostReviewBtn}>Post Review</Button>
                            </div>
                        </CardBody>
                    </Card>
                </div> : <div>
                        <Card style={{ maxWidth: '750px', margin: '2em 2em 2em 0', width: 'auto', justifySelf: 'center', alignSelf: 'center', }}>
                            <CardBody><h6 style={{ color: '#555', textAlign: 'center', paddingTop: '0.8em' }}>Please SignIn to give a Review</h6></CardBody>
                        </Card>
                    </div>}
                <div>
                    {ListOfReviews.map((rev, i) => {
                        return (
                            <Card style={{ maxWidth: '750px', margin: '2em 2em 2em 0', width: 'auto', justifySelf: 'center', alignSelf: 'center', }}>
                                <CardHeader style={{ display: 'flex' }}>
                                    <div style={{ display: 'flex' }}>{rev.Author}</div>

                                    <div style={{ flex: 'auto' }}></div>

                                    <div style={{ display: 'flex', }}>Rated: {rev.Rated} / 5.0</div>
                                </CardHeader>
                                <CardBody>{rev.Comment}
                                    <p></p>
                                </CardBody>
                                <CardFooter style={{ textAlign: 'right' }}>{rev.time.toDate().toDateString().toString()}</CardFooter>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}