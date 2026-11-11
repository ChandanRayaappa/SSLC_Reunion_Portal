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

async function loadContacts(){

    const snapshot =
    await getDocs(
        collection(db,"contacts")
    );

    let contacts = [];

    snapshot.forEach((contact)=>{

        contacts.push({
            id: contact.id,
            ...contact.data()
        });

    });

    contacts.sort((a,b)=>
        a.name.localeCompare(b.name)
    );

    let html = "";

    contacts.forEach((data)=>{

        html += `

        <tr>

            <td>
                ${data.name}
            </td>

            <td>

                <input
                type="tel"

                value="${data.phone || ''}"

                ${!isAdmin ? "readonly" : ""}

                onchange="
                updateContact(
                '${data.id}',
                this.value
                )
                ">

            </td>

            <td>

                ${isAdmin ? `

                <button
                class="deleteBtn"

                onclick="
                deleteContact(
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
    .getElementById("memberTable")
    .innerHTML = html;

}

window.updateContact =
async function(
documentId,
phone
){

    if(!isAdmin) return;

    await updateDoc(

        doc(
            db,
            "contacts",
            documentId
        ),

        {
            phone: phone
        }

    );

};

window.deleteContact =
async function(
documentId
){

    if(!confirm(
        "Delete Contact?"
    )) return;

    await deleteDoc(

        doc(
            db,
            "contacts",
            documentId
        )

    );

    loadContacts();

};

window.showContactForm =
function(){

    document
    .getElementById(
        "contactForm"
    )
    .classList.remove(
        "hidden"
    );

};

window.hideContactForm =
function(){

    document
    .getElementById(
        "contactForm"
    )
    .classList.add(
        "hidden"
    );

};

window.addContact =
async function(){

    if(!isAdmin) return;

    const name =
    document
    .getElementById(
        "contactName"
    )
    .value;

    const phone =
    document
    .getElementById(
        "contactPhone"
    )
    .value;

    if(!name){

        alert(
            "Enter Contact Name"
        );

        return;
    }

    await addDoc(

        collection(
            db,
            "contacts"
        ),

        {
            name:name,
            phone:phone
        }

    );

    document
    .getElementById(
        "contactName"
    )
    .value = "";

    document
    .getElementById(
        "contactPhone"
    )
    .value = "";

    hideContactForm();

    loadContacts();

};

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        if(!isAdmin){

            const btn =
            document.getElementById(
                "addContactBtn"
            );

            if(btn){

                btn.style.display =
                "none";

            }

        }

        loadContacts();

    }
);