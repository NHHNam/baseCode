var users = [
    {
        id: 1,
        name: 'Kien Dam',
    },
    {
        id: 2,
        name: 'Son Dang',
    },
    {
        id: 3,
        name: 'Hung Dam',
    },
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Anh Son chua ra video 🙁',
    },
    {
        id: 2,
        user_id: 2,
        content: 'Vua ra xong em oi!',
    },
    {
        id: 3,
        user_id: 1,
        content: 'Cam on anh!',
    },
];

// định nghĩa hàm
function getUserIds(comments) {
    return new Promise(function (resolve) {
        var userComments = comments.map(function (userComment) {
            return userComment.user_id;
            // nhận đc mảng các user_id đã comment
            //example: [1,2,1,3]
        });
        resolve(userComments);
    });
}

// function getInfoUserCommented() {
//     // var arrUserId =
//     getUserIds(comments).then(function (data) {
//         var userComments = users.filter(function (user) {
//             return data.includes(user.id);
//         });
//     });
// }

function getInfoUserCommented() {
    var a;
    getUserIds(comments).then(function (data) {
        var userComments = users.filter(function (user) {
            return data.includes(user.id);
        });
        a = Promise.all(userComments);
    });
    console.log(a);
}

// call
getInfoUserCommented();

// async function getInfoUserCommented() {
//     var userIds = await getUserIds(comments);
//     console.log(userIds);
// }
// getInfoUserCommented();
