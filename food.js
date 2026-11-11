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

async function loadFoods(){

    const snapshot =
    await getDocs(
        collection(db,"food")
    );

    let foods = [];

    snapshot.forEach((food)=>{

        foods.push({

            id: food.id,

            ...food.data()

        });

    });

    foods.sort((a,b)=>

        Number(a.sl_no || 0) -
        Number(b.sl_no || 0)

    );

    let html = "";

    let totalEstimated = 0;
    let totalActual = 0;

    foods.forEach((data)=>{

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
                type="number"

                value="${data.EstimatedCost || ''}"

                ${!isAdmin ? "readonly" : ""}

                onchange="
                updateFood(
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
                updateFood(
                '${data.id}',
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
                updateFood(
                '${data.id}',
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
                deleteFood(
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
    .getElementById("foodTable")
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

window.updateFood =
async function(
documentId,
field,
value
){

    await updateDoc(

        doc(
            db,
            "food",
            documentId
        ),

        {
            [field]: value
        }

    );

    loadFoods();

};

window.deleteFood =
async function(
documentId
){

    if(
        !confirm(
            "Delete Food Item?"
        )
    ) return;

    await deleteDoc(

        doc(
            db,
            "food",
            documentId
        )

    );

    loadFoods();

};

window.showFoodForm =
function(){

    document
    .getElementById(
        "foodForm"
    )
    .classList.remove(
        "hidden"
    );

};

window.hideFoodForm =
function(){

    document
    .getElementById(
        "foodForm"
    )
    .classList.add(
        "hidden"
    );

};

window.addFood =
async function(){

    const sl_no =
    document
    .getElementById(
        "foodSlNo"
    )
    .value;

    const itemName =
    document
    .getElementById(
        "foodName"
    )
    .value;

    if(!itemName){

        alert(
            "Enter Food Item Name"
        );

        return;

    }

    await addDoc(

        collection(
            db,
            "food"
        ),

        {

            sl_no: sl_no,

            itemName:
            itemName,

            EstimatedCost: "",

            ActualCost: "",

            Comments: ""

        }

    );

    document
    .getElementById(
        "foodSlNo"
    )
    .value = "";

    document
    .getElementById(
        "foodName"
    )
    .value = "";

    hideFoodForm();

    loadFoods();

};

document.addEventListener(
"DOMContentLoaded",
()=>{

    if(!isAdmin){

        const btn =
        document.getElementById(
            "addFoodBtn"
        );

        if(btn){

            btn.style.display =
            "none";

        }

    }

    loadFoods();

});