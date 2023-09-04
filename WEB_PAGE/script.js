// Designed Endpoints
const apiUrlForGet = "http://127.0.0.1:3000/studyRooms";
const apiUrlForPut = "http://127.0.0.1:3000/studyRooms/"

// Function for item fetching
async function fetchItems() {
    try {
        const response = await fetch(apiUrlForGet);
        if (!response.ok) {
            throw new Error(`HTTP error : Status: ${response.status}`);
        }
        const items = await response.json();
        return items;
    } catch (error) {
        console.error('Error fetching items:', error);
        return;
    }
}
async function renderRooms() {
    let data = await fetchItems()
    console.log(data)

    let cardHolder = document.getElementById('cardHolder')
    data.studyRooms.forEach(e => {
        console.log(e)
        //Card created
        let card = document.createElement('article')
        card.classList.add("cardStyle")
        //Label name
        let roomName = document.createElement('label')
        roomName.innerText = e.name
        //Label building
        let buildingName = document.createElement('label')
        buildingName.innerText = e.building

        card.appendChild(roomName)
        card.appendChild(buildingName)

        //console.log(buildingName, roomName)

        for (let i = 0; i < e.reservations.length; i++) {
            //Reservation list created
            let reservationList = document.createElement('div')
            reservationList.classList.add("reservationListStyle")
            //Label time
            let resTime = document.createElement('label')
            resTime.innerText = `From ${e.reservations[i].time} Hrs To ${e.reservations[i].time + 1} Hrs`
            //Label name
            let resName = document.createElement('label')
            if (e.reservations[i].name != null) {
                resName.innerText = e.reservations[i].name
            } else {
                resName.innerText = "Not Reserved"
            }
            //Label id
            let resId = document.createElement('label')
            if (e.reservations[i].id != null) {
                resId.innerText = e.reservations[i].id
                reservationList.classList.add('reservedRoom')
            } else {
                resId.innerText = ""
            }
            //button to reserve
            let resButton = document.createElement('button')
            resButton.id = i
            resButton.name = e.name
            resButton.innerText = "Reserve"
            resButton.addEventListener('click', function(event) {
                console.log("here cyka",this.name, this.id)
                reserveRoom(this.name, this.id)
            })

            reservationList.appendChild(resTime)
            reservationList.appendChild(resName)
            reservationList.appendChild(resId)
            if (e.reservations[i].id == null) {
                reservationList.appendChild(resButton)
            }
            card.appendChild(reservationList)

            //console.log(resTime, resName, resId)
        }
        cardHolder.appendChild(card)
    });
}

function reserveRoom(room, time) {
    let inputName = document.getElementById('inputName').value
    let inputLast = document.getElementById('inputLast').value
    let inputId = document.getElementById('inputId').value
    alert(`${inputName} ${inputLast}, ${inputId}, ${room}, Time ${time}`)
}

async function putNewItem(data) {
    try {
        // Request for posting on server
        const response = await fetch(apiUrlForPut, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error : Status : ${response.status}`);
        }

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        console.error('Error posting item:', error);
        return null;
    }
}

renderRooms()