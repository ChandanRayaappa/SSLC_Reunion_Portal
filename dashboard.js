import { db } from "./firebase.js";

import {
collection,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loadDashboard(){

    const contacts =
    await getDocs(
        collection(db,"contacts")
    );

    document.getElementById(
        "contactCount"
    ).innerHTML =
    contacts.size;

    const teachers =
    await getDocs(
        collection(db,"teachers")
    );

    document.getElementById(
        "teacherCount"
    ).innerHTML =
    teachers.size;

    let giftEstimated = 0;
    let giftActual = 0;

    const gifts =
    await getDocs(
        collection(db,"gifts")
    );

    gifts.forEach((doc)=>{

        const data =
        doc.data();

        giftEstimated +=
        Number(
        data.EstimatedCost || 0
        );

        giftActual +=
        Number(
        data.ActualCost || 0
        );

    });

    document.getElementById(
        "giftEstimated"
    ).innerHTML =
    giftEstimated;

    document.getElementById(
        "giftActual"
    ).innerHTML =
    giftActual;

    let foodEstimated = 0;
    let foodActual = 0;

    const foods =
    await getDocs(
        collection(db,"food")
    );

    foods.forEach((doc)=>{

        const data =
        doc.data();

        foodEstimated +=
        Number(
        data.EstimatedCost || 0
        );

        foodActual +=
        Number(
        data.ActualCost || 0
        );

    });

    document.getElementById(
        "foodEstimated"
    ).innerHTML =
    foodEstimated;

    document.getElementById(
        "foodActual"
    ).innerHTML =
    foodActual;

    let decorationEstimated = 0;
    let decorationActual = 0;

    const decorations =
    await getDocs(
        collection(db,"decoration")
    );

    decorations.forEach((doc)=>{

        const data =
        doc.data();

        decorationEstimated +=
        Number(
        data.EstimatedCost || 0
        );

        decorationActual +=
        Number(
        data.ActualCost || 0
        );

    });

    document.getElementById(
        "decorationEstimated"
    ).innerHTML =
    decorationEstimated;

    document.getElementById(
        "decorationActual"
    ).innerHTML =
    decorationActual;

    const grandEstimated =
    giftEstimated +
    foodEstimated +
    decorationEstimated;

    const grandActual =
    giftActual +
    foodActual +
    decorationActual;

    document.getElementById(
        "grandEstimated"
    ).innerHTML =
    grandEstimated;

    document.getElementById(
        "grandActual"
    ).innerHTML =
    grandActual;

    document.getElementById(
        "grandBalance"
    ).innerHTML =
    grandEstimated -
    grandActual;

}

loadDashboard();