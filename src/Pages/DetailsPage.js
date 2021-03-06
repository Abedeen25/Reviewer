import React from 'react';

import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import {postReview} from "../contexts/AuthContext";

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
import {db} from "../Services/FireService";

export default function DetailsPage(props) {
    const [value, setValue] = React.useState(2);
    const [IsSignedIn, setIsSignedIn] = React.useState(true);
    const [Review, setReview] = React.useState('anything');

    const [Review, setReview] = React.useState('anything');
    let data;

    const PostReviewBtn = () =>{

        //Getting Review
        db.collection("review").doc("4muYDwAAQBAJ").get().then( doc => {
            data = doc.data();
            console.log(data);
        });
        // eslint-disable-next-line no-undef
        if (data === undefined)
        {
            console.log("MAAL nai!");
        }

        //Posting Review
        db.collection("review").doc(props.info.BookID).collection("Reviews").doc("1").set({name:"Mentor Abedeen"}).then(function (){
            console.log("WRITTEN SUCCESSFULLY!");
        }).catch(function (error){
            console.log("Error Writing Document : " , error);
        })
    }
    
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
                {IsSignedIn ? <div>
                    <Card style={{ maxWidth: '750px', margin: '2em 2em 2em 0', width: 'auto', justifySelf: 'center', alignSelf: 'center', }}>
                        <CardHeader style={{ display: 'flex' }}>

                            <div style={{ display: 'flex' }}>Give a Review</div>

                            <div style={{ flex: 'auto' }}></div>

                            <div style={{ display: 'flex', }}>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                /></div>

                        
                    </CardHeader>
                    <CardBody>
                        {Review}
                        <FormTextarea onChange={(event) => { setReview(event.target.value) }}></FormTextarea>
                        <div style={{ display: 'flex', margin: '2em 0 0 0' }}>
                            <div style={{ flex: 'auto' }}></div>
                            <Button onClick={PostReviewBtn}>Post Review</Button>
                        </div>
                    </CardBody>
                </Card>

            </div>
        </div>
    );
}