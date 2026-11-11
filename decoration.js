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

const isAdmin = true;

async function loadDecorations(){

    const snapshot =
    await getDocs(
        collection(db,"decoration")
    );

    let html = "";

    let totalEstimated = 0;
    let totalActual = 0;

    snapshot.forEach((item)=>{

        const data =
        item.data();

        totalEstimated +=
        Number(data.EstimatedCost || 0);

        totalActual +=
        Number(data.ActualCost || 0);

        html += `

        <tr>

            <td>
                ${data.ItemName || ''}
            </td>

            <td>

                <input
                type="number"

                value="${data.EstimatedCost || ''}"

                ${!isAdmin ? "readonly" : ""}

                onchange="
                updateDecoration(
                '${item.id}',
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
                updateDecoration(
                '${item.id}',
                'ActualCost',
                this.value
                )
                ">

            </td>

            <td>

                <input
                type="text"

                value="${data.Comments || ''}"

                ${!isAdmin ? "readonly" : ""}

                onchange="
                updateDecoration(
                '${item.id}',
                'Comments',
                this.value
                )
                ">

            </td>

            <td>

                ${isAdmin ? `

                <button
                class="deleteBtn"

                onclick="
                deleteDecoration(
                '${item.id}'
                )
                ">

                Delete

                </button>

                ` : ''}

            </td>

        </tr>

        `;

    });

    document.getElementById(
        "decorationTable"
    ).innerHTML = html;

    document.getElementById(
        "totalEstimated"
    ).innerHTML =
    "₹ " + totalEstimated;

    document.getElementById(
        "totalActual"
    ).innerHTML =
    "₹ " + totalActual;

}

window.updateDecoration =
async function(
documentId,
field,
value
){

    await updateDoc(

        doc(
            db,
            "decoration",
            documentId
        ),

        {
            [field]: value
        }

    );

    loadDecorations();

};

window.deleteDecoration =
async function(
documentId
){

    if(
        !confirm(
            "Delete Decoration Item?"
        )
    ) return;

    await deleteDoc(

        doc(
            db,
            "decoration",
            documentId
        )

    );

    loadDecorations();

};

window.showDecorationForm =
function(){

    document
    .getElementById(
        "decorationForm"
    )
    .classList.remove(
        "hidden"
    );

};

window.hideDecorationForm =
function(){

    document
    .getElementById(
        "decorationForm"
    )
    .classList.add(
        "hidden"
    );

};

window.addDecoration =
async function(){

    const itemName =
    document
    .getElementById(
        "decorationName"
    )
    .value;

    if(!itemName){

        alert(
            "Enter Decoration Item Name"
        );

        return;

    }

    await addDoc(

        collection(
            db,
            "decoration"
        ),

        {

            ItemName: itemName,

            EstimatedCost: "",

            ActualCost: "",

            Comments: ""

        }

    );

    document
    .getElementById(
        "decorationName"
    )
    .value = "";

    hideDecorationForm();

    loadDecorations();

};

document.addEventListener(
"DOMContentLoaded",
()=>{

    if(!isAdmin){

        const btn =
        document.getElementById(
            "addDecorationBtn"
        );

        if(btn){

            btn.style.display =
            "none";

        }

    }

    loadDecorations();

});