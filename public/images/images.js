

// $.get(`images${location.search}`, (data) => {
//     data.response.map((image) => {
//         $("#image-gallery")
//             .append(`<a href="gallery/${image.fileName}">${image.title}</a>`);
//     });
// });

// const url = window.location.href;
// let videoId = url.substr(url.lastIndexOf("/") + 1);

// $.get(`/images/${imageId}`)
//     .done((data) => {
//         console.log(data.response);

//         $("#title").text(data.response.title);

//         const gallery = `<image id="gallery" controls>
//                     <source src="/${imageId}" >
//                     Your browser does not support the image tag.
//                 </image>`;

//         $("#gallery").append(gallery);

//     })
//     .catch((error) => {
//         console.log(error);
//         $("#title").text("Could not find image");
//     });