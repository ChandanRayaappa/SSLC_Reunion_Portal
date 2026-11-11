import { db } from "./firebase.js";

import {
collection,
getDocs,
updateDoc,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loadTeachers(){

const snapshot =
await getDocs(
collection(db,"teachers")
);

let html = "";
let count = 1;

snapshot.forEach((teacher)=>{

const data =
teacher.data();

html += `

<tr>

<td>${count++}</td>

<td>${data.teacherName}</td>

<td>
<input
type="tel"
id="phone_${teacher.id}"
value="${data.phone || ''}"

onchange="
updateTeacher(
'${teacher.id}',
'phone',
this.value
)
">
</td>

<td>
${data.Responsible || ''}
</td>

<td>

<textarea
id="comments_${teacher.id}"

onchange="
updateTeacher(
'${teacher.id}',
'comments',
this.value
)
">


</textarea>

</td>

<td>

<button
class="deleteBtn"
onclick="deleteTeacher(
'${teacher.id}'
)">
🗑 Delete
</button>

</td>


</tr>

`;

});

document.getElementById(
"teacherTable"
).innerHTML = html;

}

window.updateTeacher =
async function(
documentId,
field,
value
){

await updateDoc(

doc(
db,
"teachers",
documentId
),

{
[field]: value
}

);

};

window.addTeacher =
async function(){
    document
.getElementById("teacherForm")
.classList.add("hidden");

    const teacherName =
    document.getElementById(
        "teacherName"
    ).value;

    const responsible =
    document.getElementById(
        "teacherResponsible"
    ).value;

    const comments =
    document.getElementById(
        "teacherComments"
    ).value;

    if(!teacherName){

        alert(
            "Enter Teacher Name"
        );

        return;

    }

    await addDoc(

        collection(
            db,
            "teachers"
        ),

        {

            teacherName:
            teacherName,

            phone:"",

            Responsible:
            responsible,

            comments:
            comments

        }

    );

    document.getElementById(
        "teacherName"
    ).value="";

    document.getElementById(
        "teacherResponsible"
    ).value="";

    document.getElementById(
        "teacherComments"
    ).value="";

    loadTeachers();

};

window.showTeacherForm = function(){

    document
    .getElementById("teacherForm")
    .classList.remove("hidden");

}

window.hideTeacherForm = function(){

    document
    .getElementById("teacherForm")
    .classList.add("hidden");

}
document
.getElementById("teacherForm")
.classList.add("hidden");

window.deleteTeacher =
async function(documentId){

    if(
        !confirm(
            "Delete Teacher?"
        )
    ){
        return;
    }

    await deleteDoc(
        doc(
            db,
            "teachers",
            documentId
        )
    );

    loadTeachers();

}



loadTeachers();