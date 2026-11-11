import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const contacts = [

{name:"Aishwarya",phone:"8971004435"},
{name:"Sushma BS",phone:"9071071469"},
{name:"Shilpa",phone:"6364052118"},
{name:"Arpitha",phone:"RIP"},
{name:"Pooja K R",phone:"8904557249"},
{name:"Nischitha",phone:"9008779542"},
{name:"Maduri",phone:"8618964682"},
{name:"Meghana",phone:"NA"},
{name:"Ashwini",phone:"NA"},
{name:"Rakshitha",phone:"9180112641"},
{name:"Anusha B L",phone:"7090542706"},
{name:"Amulya",phone:"9606710858"},
{name:"Chaithra",phone:"9606211186"},
{name:"Ruchitha",phone:"8431637722"},
{name:"Perdouse",phone:"7022972757"},
{name:"Preethi",phone:"6364241202"},
{name:"Anusha K G",phone:"6360514969"},
{name:"Sharvani",phone:"9739336446"},
{name:"Likitha",phone:"7349066893"},
{name:"Savitha",phone:""},
{name:"Vishalaxi",phone:"NA"},
{name:"Deepika",phone:"8904122518"},
{name:"Ranjitha",phone:"NA"},
{name:"Anitha K L",phone:"9686256249"},
{name:"Deepika Basavanahalli",phone:"9606411379"},
{name:"Divya",phone:"9590539692"},
{name:"Harshitha",phone:"9353161688"},
{name:"Ashwini",phone:"NA"},
{name:"Shila",phone:"NA"},
{name:"Divya",phone:"8296697663"},
{name:"Nikitha",phone:"7676061384"},
{name:"Priyanka",phone:"9741482770"},
{name:"Megha",phone:"887524599"},
{name:"Hindu Sri",phone:"9019973692"},
{name:"Shana",phone:"9071920602"},
{name:"Bhoomika",phone:"9663426774"},
{name:"chandini",phone:"A"},
{name:"Vedamani",phone:"7892618155"},
{name:"Bharathi JN",phone:"8050473863"},
{name:"Arunkumar BC",phone:"9066843167"},
{name:"Abhishek",phone:"9632692749"},
{name:"Pramod",phone:"9741330796"},
{name:"Nikil",phone:"RIP"},
{name:"Divakara",phone:"7338280848"},
{name:"Shuhas",phone:"9663715977"},
{name:"Dooresha",phone:"7026803410"},
{name:"Manju KR",phone:"9535919108"},
{name:"Kumara BP",phone:"8884044448"},
{name:"Chethan",phone:"8296687236"},
{name:"Sanjay",phone:"9164094982"},
{name:"Sachin",phone:"8861519152"},
{name:"Chandan",phone:"8971715600"},
{name:"Rajesh",phone:"9663649830"},
{name:"Rakesh",phone:"8861574810"},
{name:"Mahantesha",phone:"9663633684"},
{name:"Sanju",phone:"9980551318"},
{name:"Akash",phone:"9611701227"},
{name:"Ajith",phone:"7022533638"},
{name:"Rakshith M",phone:"9902381218"},
{name:"Chethan R",phone:"7338159448"},
{name:"Anukumar",phone:"9611148417"},
{name:"Shrinivasa BV",phone:"9071071597"},
{name:"Raghu",phone:"9844794245"},
{name:"Prasad",phone:"7676081596"},
{name:"Dileep",phone:"9108686589"},
{name:"RajaShekara",phone:"7353127154"},
{name:"Punith Raj",phone:"9964975716"},
{name:"Ganesha",phone:"9902436208"},
{name:"Aswath",phone:"7337767419"},
{name:"Akelesha",phone:"8970284438"},
{name:"Mohana Kumar",phone:"NA"},
{name:"Santhosh",phone:"7411517352"},
{name:"Sharath BR",phone:"A"},
{name:"Raghu K",phone:"7022830127"},
{name:"Shivakumara KV",phone:"9663089350"},
{name:"Sachin BA",phone:"7892128378"},
{name:"Manjunath KL",phone:"NA"}

];

async function uploadContacts(){

    for(const contact of contacts){

        await addDoc(
            collection(db,"contacts"),
            contact
        );

    }

    alert(
        "All Contacts Uploaded Successfully ✅"
    );

}

uploadContacts();