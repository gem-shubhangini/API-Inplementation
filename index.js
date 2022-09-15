var random = document.getElementById("random");
var all = document.getElementById("all");
var hound = document.getElementById("hound");
var create = document.getElementById("create");
var upload = document.getElementById("upload");
var list = document.getElementById("list");
var listname = document.getElementById("listname");
var gallery = document.getElementById("Picture-gallery");
var search = document.getElementById("search");
var searchtext = document.getElementById("searchtext");
var photo = document.getElementById("photo");
var exampleModal = document.getElementById("exampleModal");
var save = document.getElementById("save");
var data = [];
var url;
random.addEventListener('click', () => {
    data = [];
    url = 'https://dog.ceo/api/breeds/image/random'
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            data.push(json);
            getRandomData(data);
            console.log(data)
        });
})

all.addEventListener(('click'), () => {
    data = [];
    let input = 50;
    url = 'https://dog.ceo/api/breeds/image/random'
    fetch(`${url}/${input}`)
        .then((response) => response.json())
        .then((json) => {
            data.push(json)
            console.log(json)

            getData(data)
        });

})

hound.addEventListener('click', () => {
    data = [];
    url = 'https://dog.ceo/api/breed/hound/images'
    fetch('https://dog.ceo/api/breed/hound/images')
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            data.push(json)
            getData(data);
        });
})
const getRandomData = (data) => {
    listname.style.display = "none";
    gallery.style.display = "block";
    data.forEach((object, index) => {
        gallery.innerHTML += `<div class="responsive">
        <div class="gallery">
          <a target="_blank" href="Dog.jpg">
            <img src="${object.message}" alt="Dog" width="500" height="500">
          </a>
          <div class="desc"><i class="fa-regular fa-pen-to-square" data-id="${index}" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="editPhoto(this)">Edit</i></div>
        </div>
      </div>`
    });
}
const getData = (data) => {
    console.log("details", data)
    listname.style.display = "none";
    gallery.style.display = "block";
    let i = 0;
    data.map((item) => item.message.map((item) => {

        gallery.innerHTML += `<div class="responsive">
        <div class="gallery">
        
            <img src="${item}" alt="Dog" width="500" height="500">

          <div class="desc"><i class="fa-regular fa-pen-to-square" data-id="${i}" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="editPhoto(this)"></i><i onClick="deletePhoto(this)" class="fas fa-trash-alt"></i></div>
        </div>
      </div>`
        i++;
    })
    )
}

let id;
const editPhoto = (e) => {
    id = e.data - id;
    photo.src = e.parentElement.previousElementSibling.src;
    console.log(photo.src);


    save.addEventListener('click', () => {
        e.preventDefault();
        console.log(photo.src)
        e.parentElement.previousElementSibling.src = photo.value;
        exampleModal.modal('hide');
        // fetch(`${url}/${id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify({
        //       id: id,
        //       message:`${photo.value}`,
        //       status:"success"
        //     }),
        //     headers: {
        //       'Content-type': 'application/json; charset=UTF-8',
        //     },
        //   })
        //     .then((response) => response.json())
        //     .then((json) => console.log(json));
    })

}
const deletePhoto = (e) => {

    e.parentElement.parentElement.remove();
    console.log("Photo deleted", e.parentElement.parentElement)
}
list.addEventListener('click', () => {
    data = [];
    gallery.style.display = "none";
    listname.style.display = "block"
    fetch('https://dog.ceo/api/breeds/list/all')
        .then((response) => response.json())
        .then((json) => {
            data.push(json.message);
            console.log(data);
            data.forEach((object, index) => {
                Object.keys(object).map((item) => {
                    listname.innerHTML += `<li>${item}</li>`
                })
            })

        });
})

search.addEventListener(('click'), () => {
    if (searchtext.value.length !== 0) {
        data = [];
        fetch(`https://dog.ceo/api/breed/${searchtext.value}/images`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                data.push(json)
                console.log(json)
                getData(data);
            });
    }

})

save.addEventListener('click', () => {
    console.log(photo.value)

    fetch(`https://dog.ceo/api/breed/hound/images`, {
        method: 'POST',
        body: JSON.stringify({
            message: `${photo.value}`,
            status: "success"
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
})

