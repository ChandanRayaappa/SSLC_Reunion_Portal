import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const isAdmin =
localStorage.getItem("isAdmin") === "true";

async function loadGifts(){

    const snapshot =
    await getDocs(
        collection(db,"gifts")
    );

    let gifts = [];

    snapshot.forEach((gift)=>{

        gifts.push({

            id: gift.id,

            ...gift.data()

        });

    });

    gifts.sort((a,b)=>

        Number(a.sl_no || 0) -
        Number(b.sl_no || 0)

    );

    let html = "";

    let totalEstimated = 0;
    let totalActual = 0;

    gifts.forEach((data)=>{

        totalEstimated +=
        Number(data.EstimatedCost || 0);

        totalActual +=
        Number(data.ActualCost || 0);

        html += `

        <tr>

            <td>${data.sl_no || ''}</td>

            <td>${data.itemName || ''}</td>

            <td>

                <input
                type="text"

                value="${data.status || ''}"

                ${!isAdmin ? "readonly" : ""}

                onchange="
                updateGift(
                '${data.id}',
                'status',
                this.value
                )
                ">

            </td>

            <td>

                <input
                type="number"

                value="${data.EstimatedCost || ''}"

                ${!isAdmin ? "readonly" : ""}

                onchange="
                updateGift(
                '${data.id}',
                'EstimatedCost',
                this.value
                )
                ">

            </td>

            <td>

                <input
                type="number"

                value="${data.ActualCost || ''}"

                ${!isAdmin ? "readonly" : ""}

                onchange="
                updateGift(
                '${data.id}',
                'ActualCost',
                this.value
                )
                ">

            </td>

            <td>

                ${isAdmin ? `

                <button
                class="deleteBtn"

                onclick="
                deleteGift(
                '${data.id}'
                )
                ">

                Delete

                </button>

                ` : ''}

            </td>

        </tr>

        `;

    });

    document
    .getElementById("giftTable")
    .innerHTML = html;

    document
    .getElementById("totalEstimated")
    .innerHTML =
    "₹ " + totalEstimated;

    document
    .getElementById("totalActual")
    .innerHTML =
    "₹ " + totalActual;

}

window.updateGift =
async function(
documentId,
field,
value
){

    await updateDoc(

        doc(
            db,
            "gifts",
            documentId
        ),

        {
            [field]: value
        }

    );

    loadGifts();

};

window.deleteGift =
async function(
documentId
){

    if(
        !confirm(
            "Delete Gift Item?"
        )
    ) return;

    await deleteDoc(

        doc(
            db,
            "gifts",
            documentId
        )

    );

    loadGifts();

};

window.showGiftForm =
function(){

    document
    .getElementById(
        "giftForm"
    )
    .classList.remove(
        "hidden"
    );

};

window.hideGiftForm =
function(){

    document
    .getElementById(
        "giftForm"
    )
    .classList.add(
        "hidden"
    );

};

window.addGift =
async function(){

    const sl_no =
    document
    .getElementById(
        "giftSlNo"
    )
    .value;

    const itemName =
    document
    .getElementById(
        "giftName"
    )
    .value;

    if(!itemName){

        alert(
            "Enter Gift Name"
        );

        return;

    }

    await addDoc(

        collection(
            db,
            "gifts"
        ),

        {

            sl_no: sl_no,

            itemName:
            itemName,

            status: "",

            EstimatedCost: "",

            ActualCost: ""

        }

    );

    document
    .getElementById(
        "giftSlNo"
    )
    .value = "";

    document
    .getElementById(
        "giftName"
    )
    .value = "";

    hideGiftForm();

    loadGifts();

};

document.addEventListener(
"DOMContentLoaded",
()=>{

    if(!isAdmin){

        const btn =
        document.getElementById(
            "addGiftBtn"
        );

        if(btn){

            btn.style.display =
            "none";

        }

    }

    loadGifts();

});