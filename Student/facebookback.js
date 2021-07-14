// async function facebook(params, origin) {

//     const facebookUser = await db.Student.findOne({
//         provider_id: params.facebookId,
//         social_provider: "facebook"
//     });

//     console.log("facebook user ======>", facebookUser)

//     if (!facebookUser) {
//         console.log("User does not exist")
//         const account = new db.Student();
//         account.status = "active";
//         account.provider_id = params.userID;
//         account.name = params.name;
//         account.social_provider = params.providerName;
//         account.image = params.imageUrl
//         await account.save();
//         const jwtToken = generateJwtToken(facebookUser);
//         return {
//             account: facebookUser,
//             jwtToken: jwtToken
//         };
//     } else if (facebookUser) {


//         const jwtToken = generateJwtToken(facebookUser);
//         return {
//             account: facebookUser,
//             jwtToken: jwtToken
//         };
//     } else {
//         throw "some error"
//     }

// }