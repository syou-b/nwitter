import { dbService } from "fbase";
import React, {useEffect, useState} from "react";

 const Home = ({userObj}) => {
     const [nweet, setNweet] = useState("");
     const [nweets, setNweets] = useState([]);
     
     useEffect(() => {
        getNweets();
        dbService.collection("nweets").onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
     }, [])
     const onSubmit = async (event) => {
         event.preventDefault();
         await dbService.collection("nweets").add({
             text: nweet,
             createAt :  Date.now(),
             creatorId: userObj.uid,
         });
         setNweet("");
     };
     const onChange = (event) => {
         const {
             target: {value},
         } = event;
         setNweet(value);
     };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value = {nweet} onChange={onChange} type = "text" placeholder="What's on your mind?" maxLength={120} />
                <input type = "submit" value="Nweet"/>
            </form>
            <div key={nweet.id}>
                {nweets.map(nweet => <div>
                    <h4>{nweet.text}</h4>
                </div>)}
            </div>
        </div>
    );
 };
 
 export default Home;