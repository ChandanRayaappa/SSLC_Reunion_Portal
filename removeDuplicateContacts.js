import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function removeDuplicates() {

    const snapshot =
        await getDocs(
            collection(db, "contacts")
        );

    const seen = new Set();

    for (const contact of snapshot.docs) {

        const data = contact.data();

        const key =
            (
                data.name || ""
            ).toLowerCase().trim() +
            "_" +
            (
                data.phone || ""
            ).toLowerCase().trim();

        if (seen.has(key)) {

            console.log(
                "Deleting Duplicate:",
                data.name,
                data.phone
            );

            await deleteDoc(
                doc(
                    db,
                    "contacts",
                    contact.id
                )
            );

        } else {

            seen.add(key);

        }

    }

    alert(
        "Duplicate Contacts Removed ✅"
    );

}

removeDuplicates();