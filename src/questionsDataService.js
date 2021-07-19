import {db} from './firebase.js'

export const questionCollections = db.collection("geographyquestions");

export const useLoadQuestions = () => {
    let questionsData = [];

    questionCollections.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            questionsData.push(doc.data());
        });
    });

    return questionsData;
};
